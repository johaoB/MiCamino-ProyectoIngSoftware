/**
 * adminController.js
 * Controlador de Administración
 *
 * Trazabilidad:
 *  - CU04 – Validar Registro de Estudiante por Administrador
 *  - CU05 – Registrar Padre de Familia y Vincular a Estudiante
 *  - CU06 – Gestionar Permisos de Docentes y Orientadores
 *  - RF-001: Creación de cuentas de usuario
 *  - RF-005: Validación institucional
 *  - RF-006: Configuración de permisos
 */

const UserModel = require('../models/userModel');
const pool = require('../db/pool');

/**
 * getPendientes
 * CU04 – Validar Registro de Estudiante por Administrador | RF-005
 * Paso 1-2: "El administrador accede a 'Registros pendientes'"
 *   → sistema muestra lista de solicitudes con estado 'pendiente de validación'
 */
const getPendientes = async (req, res) => {
  try {
    const rows = await UserModel.getPendientes();
    res.json(rows.map(({ password: _, ...u }) => u));
  } catch (err) { res.status(500).json({ message: err.message }); }
};

/**
 * aprobar
 * CU04 – Paso 4-5: "El administrador decide: acepta la solicitud"
 *   → sistema actualiza estado de cuenta a 'activo'
 * RF-005: Validación institucional — postcondición: cuenta queda 'activa'
 */
const aprobar = async (req, res) => {
  try {
    const updated = await UserModel.updateEstado(Number(req.params.id), 'activo');
    if (!updated) return res.status(404).json({ message: 'Usuario no encontrado' });
    const { password: _, ...safe } = updated;
    res.json({ message: 'Usuario aprobado', user: safe });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

/**
 * denegar
 * CU04 – Paso 4-5: "El administrador decide: rechaza la solicitud"
 *   → sistema actualiza estado de cuenta a 'denegado'
 * CU04 Flujo Alterno 3b: "La institución no corresponde → rechaza con motivo"
 * RF-005: postcondición: cuenta queda 'rechazada'
 */
const denegar = async (req, res) => {
  try {
    const updated = await UserModel.updateEstado(Number(req.params.id), 'denegado');
    if (!updated) return res.status(404).json({ message: 'Usuario no encontrado' });;
    const { password: _, ...safe } = updated;
    res.json({ message: 'Usuario denegado', user: safe });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

/**
 * getEstudiantes
 * RF-004: Visualización de estudiantes
 * CU03 / CU04: Lista todos los estudiantes registrados con grado y grupo
 *   para consulta por administrador u orientador
 */
const getEstudiantes = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.id_usuario AS id, u.nombre_completo AS name, u.correo AS email,
             u.estado, i.nombre AS institucion, e.grado, e.grupo
      FROM usuario u
      JOIN institucion i  ON u.id_institucion = i.id_institucion
      JOIN usuario_rol ur ON u.id_usuario = ur.id_usuario
      JOIN rol r          ON ur.id_rol = r.id_rol AND r.nombre = 'usuario'
      LEFT JOIN estudiante e ON e.id_usuario = u.id_usuario
    `);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

/**
 * getPadres
 * CU05 – Registrar Padre de Familia y Vincular a Estudiante
 * RF-016: Visualización de resultados por padres
 * Lista padres/acudientes activos para facilitar la vinculación
 */
const getPadres = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.id_usuario AS id, u.nombre_completo AS name, u.correo AS email,
             u.estado, i.nombre AS institucion
      FROM usuario u
      JOIN institucion i  ON u.id_institucion = i.id_institucion
      JOIN usuario_rol ur ON u.id_usuario = ur.id_usuario
      JOIN rol r          ON ur.id_rol = r.id_rol AND r.nombre = 'padre'
      WHERE u.estado = 'activo'
    `);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

/**
 * vincularPadreEstudiante
 * CU05 – Registrar Padre de Familia y Vincular a Estudiante | RF-016
 * Paso 5-6: "El sistema valida el código y confirma la relación padre-estudiante"
 *   → crea registro en vinculacion_padre_estudiante con estado 'activo'
 * Flujo Alterno: padre ya vinculado → 409 Conflict
 */
const vincularPadreEstudiante = async (req, res) => {
  const { idPadre, idEstudiante } = req.body;
  if (!idPadre || !idEstudiante)
    return res.status(400).json({ message: 'Se requieren idPadre e idEstudiante' });

  try {
    // CU05 Flujo Alterno: "El estudiante ya tiene un acudiente vinculado"
    const [[existe]] = await pool.query(
      `SELECT id_vinculacion FROM vinculacion_padre_estudiante
       WHERE id_padre = ? AND id_usuario = ?`,
      [idPadre, idEstudiante]
    );
    if (existe)
      return res.status(409).json({ message: 'Ya existe un vínculo entre este padre y estudiante' });

    // CU05 Paso 6: crea la cuenta del padre vinculada al estudiante
    const [result] = await pool.query(
      `INSERT INTO vinculacion_padre_estudiante (id_padre, id_usuario, estado, fecha_vinculacion)
       VALUES (?, ?, 'activo', NOW())`,
      [idPadre, idEstudiante]
    );
    res.status(201).json({ message: 'Vínculo creado exitosamente', id_vinculacion: result.insertId });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getPendientes, aprobar, denegar, getEstudiantes, getPadres, vincularPadreEstudiante };
