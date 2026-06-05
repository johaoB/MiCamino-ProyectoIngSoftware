/**
 * userModel.js
 * Modelo Maestro de Usuario
 *
 * Trazabilidad:
 *  - CU01 – Registrar Estudiante
 *  - CU02 – Iniciar Sesión como Estudiante
 *  - CU04 – Validar Registro de Estudiante por Administrador
 *  - RF-001: Creación de cuentas de usuario
 *  - RF-002: Inicio de sesión
 *  - RF-003: Gestión del perfil del estudiante
 *  - RF-005: Validación institucional
 *  - Diagrama de Secuencia CU01 (DiagramadeSecuencia.jpeg / DiagramadeSecuencia3.jpeg)
 *  - Diagrama de Secuencia CU02 (DiagramadeSecuencia2.jpeg)
 */

const pool = require('../db/pool');

// ── SELECT base: usuario + rol + institución ──────────────────
const SELECT_USER = `
  SELECT
    u.id_usuario      AS id,
    u.nombre_completo AS name,
    u.correo          AS email,
    u.contrasena      AS password,
    u.fecha_registro  AS fechaRegistro,
    u.id_institucion,
    i.nombre          AS institucion,
    r.nombre          AS role,
    r.id_rol,
    ur_estado.estado  AS estado
  FROM usuario u
  JOIN institucion i          ON u.id_institucion = i.id_institucion
  JOIN usuario_rol ur         ON u.id_usuario = ur.id_usuario
  JOIN rol r                  ON ur.id_rol = r.id_rol
  LEFT JOIN (
    SELECT id_usuario,
           CASE WHEN COUNT(*) > 0 THEN 'activo' ELSE 'pendiente' END AS estado
    FROM usuario_rol GROUP BY id_usuario
  ) ur_estado ON u.id_usuario = ur_estado.id_usuario
`;

/**
 * getAll
 * RF-004: Visualización de estudiantes
 * CU03 Paso 2: sistema muestra lista de estudiantes asignados
 */
const getAll = async () => {
  const [rows] = await pool.query(`
    SELECT u.id_usuario AS id, u.nombre_completo AS name, u.correo AS email,
           u.estado, u.fecha_registro AS fechaRegistro,
           i.nombre AS institucion, r.nombre AS role
    FROM usuario u
    JOIN institucion i   ON u.id_institucion = i.id_institucion
    JOIN usuario_rol ur  ON u.id_usuario = ur.id_usuario
    JOIN rol r           ON ur.id_rol = r.id_rol
  `);
  return rows;
};

/**
 * getById
 * RF-003: Gestión del perfil del estudiante
 * CU03 Paso 5: "El sistema muestra el perfil detallado del estudiante seleccionado"
 */
const getById = async (id) => {
  const [rows] = await pool.query(`
    SELECT u.id_usuario AS id, u.nombre_completo AS name, u.correo AS email,
           u.contrasena AS password, u.estado, u.fecha_registro,
           i.nombre AS institucion, u.id_institucion,
           r.nombre AS role, r.id_rol
    FROM usuario u
    JOIN institucion i   ON u.id_institucion = i.id_institucion
    JOIN usuario_rol ur  ON u.id_usuario = ur.id_usuario
    JOIN rol r           ON ur.id_rol = r.id_rol
    WHERE u.id_usuario = ?
  `, [id]);
  return rows[0] || null;
};

/**
 * getByEmail
 * CU02 – Iniciar Sesión como Estudiante | RF-002
 * DS-CU02 Paso 5: obteneDatosSeguridadcorreo) — retorna hash y estado de cuenta
 *   para verificación: hashGuardado, estadoCuenta, rol, id
 * Incluye datos de estudiante (grado, grupo) para cargar perfil completo en memoria
 */
const getByEmail = async (email) => {
  const [rows] = await pool.query(`
    SELECT
      CAST(u.id_usuario AS UNSIGNED) AS id,
      u.nombre_completo AS name,
      u.correo          AS email,
      u.contrasena      AS password,
      u.estado,
      u.fecha_registro,
      i.nombre          AS institucion,
      u.id_institucion,
      r.nombre          AS role,
      r.id_rol,
      e.grado,
      e.grupo
    FROM usuario u
    JOIN institucion i     ON u.id_institucion = i.id_institucion
    JOIN usuario_rol ur    ON u.id_usuario = ur.id_usuario
    JOIN rol r             ON ur.id_rol = r.id_rol
    LEFT JOIN estudiante e ON e.id_usuario = u.id_usuario
    WHERE u.correo = ?
    ORDER BY ur.id_rol ASC
    LIMIT 1
  `, [email]);
  return rows[0] || null;
};

/**
 * getPendientes
 * CU04 – Validar Registro de Estudiante por Administrador | RF-005
 * Paso 2: sistema muestra lista de solicitudes con estado 'pendiente'
 */
const getPendientes = async () => {
  const [rows] = await pool.query(`
    SELECT u.id_usuario AS id, u.nombre_completo AS name, u.correo AS email,
           u.estado, i.nombre AS institucion, r.nombre AS role
    FROM usuario u
    JOIN institucion i   ON u.id_institucion = i.id_institucion
    JOIN usuario_rol ur  ON u.id_usuario = ur.id_usuario
    JOIN rol r           ON ur.id_rol = r.id_rol
    WHERE u.estado = 'pendiente'
  `);
  return rows;
};

/**
 * getEstudiantesByInst
 * RF-004: Visualización de estudiantes filtrados por institución
 * CU03: orientador visualiza estudiantes de su institución
 */
const getEstudiantesByInst = async (institucion) => {
  const [rows] = await pool.query(`
    SELECT u.id_usuario AS id, u.nombre_completo AS name, u.correo AS email,
           u.estado, i.nombre AS institucion,
           e.grado, e.grupo
    FROM usuario u
    JOIN institucion i   ON u.id_institucion = i.id_institucion
    JOIN usuario_rol ur  ON u.id_usuario = ur.id_usuario
    JOIN rol r           ON ur.id_rol = r.id_rol
    JOIN estudiante e    ON e.id_usuario = u.id_usuario
    WHERE i.nombre = ? AND u.estado = 'activo'
  `, [institucion]);
  return rows;
};

/**
 * create
 * CU01 – Registrar Estudiante | RF-001
 * DS-CU01:
 *   Paso 5  existeUsuario(correo, documento) — verificación implícita por UNIQUE en BD
 *   Paso 6  new Estudiante(datos, estado='pendiente') — INSERT con estado 'pendiente'
 *   Paso 7  guardarUsuario(instanciaEstudiante) — commit de la transacción
 *   Paso 8  registrarAuditoria('Registro', id) — INSERT en usuario_rol
 *   Paso 9  enviarCorreoConfirmacion(correo) — pendiente de implementación (ServicioCorreo)
 *   Postcondición 1: cuenta creada con estado 'pendiente de validación'
 *   Flujo Alterno 5b: ER_DUP_ENTRY → correo o documento ya existen
 *
 * La transacción garantiza atomicidad:
 *   1. Obtener/crear institución
 *   2. Crear usuario con estado 'pendiente'
 *   3. Asignar rol
 *   4. Si es estudiante, crear registro en tabla estudiante
 */
const create = async ({ name, email, password, role, institucion, grado, grupo }) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // DS-CU01: obtener o crear institución (RF-005: validación institucional)
    let [[inst]] = await conn.query('SELECT id_institucion FROM institucion WHERE nombre = ?', [institucion || 'Sistema (interna)']);
    if (!inst) {
      const [r] = await conn.query(
        'INSERT INTO institucion (nombre, tipo, municipio, estado) VALUES (?, ?, ?, ?)',
        [institucion, 'Pública', 'Medellín', 'activo']
      );
      inst = { id_institucion: r.insertId };
    }

    // DS-CU01 Paso 6: new Estudiante(datos, estado='pendiente')
    const [res] = await conn.query(
      'INSERT INTO usuario (nombre_completo, correo, contrasena, fecha_registro, id_institucion, estado) VALUES (?, ?, ?, NOW(), ?, ?)',
      [name, email, password, inst.id_institucion, 'pendiente']
    );
    const id = res.insertId;

    // DS-CU01 Paso 8: registrarAuditoria — vincular rol (usuario_rol)
    const [[rolRow]] = await conn.query('SELECT id_rol FROM rol WHERE nombre = ?', [role || 'usuario']);
    if (!rolRow) throw new Error(`Rol "${role}" no existe`);
    await conn.query('INSERT INTO usuario_rol (id_usuario, id_rol) VALUES (?, ?)', [id, rolRow.id_rol]);

    // Si el rol es 'usuario' (estudiante), crear registro en tabla estudiante
    if (role === 'usuario') {
      await conn.query(
        'INSERT INTO estudiante (id_usuario, grado, grupo) VALUES (?, ?, ?)',
        [id, grado || '10°', grupo || 'A']
      );
    }

    // DS-CU01 Paso 7: commit — persistencia y auditoría
    await conn.commit();
    return { id, name, email, role, institucion, estado: 'pendiente' };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

/**
 * updateEstado
 * CU04 – Validar Registro de Estudiante | RF-005
 * Paso 5: "El sistema actualiza el estado de la cuenta"
 *   estado: 'activo' (aprobado) | 'denegado' (rechazado)
 * Postcondición CU04: cuenta queda 'activa' o 'rechazada'
 */
const updateEstado = async (id, estado) => {
  await pool.query('UPDATE usuario SET estado = ? WHERE id_usuario = ?', [estado, id]);
  return getById(id);
};

/**
 * updatePerfil
 * RF-003: Gestión del perfil del estudiante — editar información personal y académica
 * CU03 Paso 6: "El orientador registra observaciones" — también cubre edición propia del usuario
 */
const updatePerfil = async (id, { name, email, password }) => {
  const fields = [];
  const values = [];

  if (name)     { fields.push('nombre_completo = ?'); values.push(name); }
  if (email)    { fields.push('correo = ?');           values.push(email); }
  if (password) { fields.push('contrasena = ?');       values.push(password); }

  if (fields.length === 0) return getById(id);

  values.push(id);
  await pool.query(
    `UPDATE usuario SET ${fields.join(', ')} WHERE id_usuario = ?`,
    values
  );
  return getById(id);
};

/**
 * remove
 * RF-006: Configuración de permisos
 * CU06: administrador puede remover usuarios del sistema
 */
const remove = async (id) => {
  const user = await getById(id);
  if (!user) return null;
  await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
  return user;
};

module.exports = {
  getAll, getById, getByEmail, getPendientes, getEstudiantesByInst,
  create, updateEstado, updatePerfil, remove,
};
