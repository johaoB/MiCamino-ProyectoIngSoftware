/**
 * userController.js
 * Controlador de Usuarios (CRUD de maestro)
 *
 * Trazabilidad:
 *  - CU01 – Registrar Estudiante
 *  - CU04 – Validar Registro de Estudiante por Administrador
 *  - RF-001: Creación de cuentas de usuario
 *  - RF-003: Gestión del perfil del estudiante
 *  - RF-004: Visualización de estudiantes
 *  - Diagrama de Secuencia CU01: Registrar Estudiante
 *    (DiagramadeSecuencia.jpeg / DiagramadeSecuencia3.jpeg)
 */

const UserModel = require('../models/userModel');

/**
 * getUsers
 * RF-004: Visualización de estudiantes
 * CU03 – Gestionar Estudiantes desde Panel del Orientador
 * DS-CU01: Consulta general de usuarios registrados en el sistema.
 */
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.getAll();
    // Nunca exponer la contraseña al cliente
    res.json(users.map(({ password: _, ...u }) => u));
  } catch (err) { res.status(500).json({ message: err.message }); }
};

/**
 * getUserById
 * RF-003: Gestión del perfil del estudiante
 * CU03 – Gestionar Estudiantes: Paso 5 "El sistema muestra el perfil detallado"
 */
const getUserById = async (req, res) => {
  try {
    const user = await UserModel.getById(Number(req.params.id));
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    const { password: _, ...safe } = user;
    res.json(safe);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

/**
 * createUser
 * CU01 – Registrar Estudiante | RF-001
 * DS-CU01:
 *   Paso 4  registrarEstudiante(datos) — recibe datos del formulario
 *   Paso 6  new Estudiante(datos, estado='pendiente') — delega a UserModel.create
 *   Paso 7  guardarUsuario(instanciaEstudiante) — persistencia
 *   Paso 8  registrarAuditoria('Registro', id) — manejado internamente en el modelo
 *   Postcondición 1: cuenta creada con estado 'pendiente de validación'
 *   Flujo Alterno 5b: correo duplicado → ER_DUP_ENTRY → errorDuplicado
 */
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, institucion, grado, grupo } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'name, email y password son requeridos' });

    // DS-CU01 Paso 6-7: crear usuario con estado 'pendiente'
    const newUser = await UserModel.create({ name, email, password, role, institucion, grado, grupo });
    res.status(201).json(newUser);
  } catch (err) {
    // DS-CU01 Flujo Alterno 5b: "El correo o documento ya existen"
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(409).json({ message: 'El correo ya está registrado' });
    res.status(500).json({ message: err.message });
  }
};

/**
 * updateUser
 * RF-003: Gestión del perfil del estudiante — editar información personal
 * CU03 Paso 6: "El orientador registra observaciones" / actualización de perfil
 */
const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updated = await UserModel.updatePerfil(Number(req.params.id), { name, email, password });
    if (!updated) return res.status(404).json({ message: 'Usuario no encontrado' });
    const { password: _, ...safe } = updated;
    res.json(safe);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(409).json({ message: 'El correo ya está en uso' });
    res.status(500).json({ message: err.message });
  }
};

/**
 * deleteUser
 * RF-006: Configuración de permisos — el administrador puede eliminar usuarios
 * CU06 – Gestionar Permisos: acción de remoción de un usuario del sistema
 */
const deleteUser = async (req, res) => {
  try {
    const deleted = await UserModel.remove(Number(req.params.id));
    if (!deleted) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
