/**
 * userRoutes.js
 * Rutas CRUD de Usuarios
 *
 * CU01 – Registrar Estudiante: POST /users → createUser
 * CU03 – Gestionar Estudiantes: GET /users → getUsers, GET /users/:id → getUserById
 * RF-001: Creación de cuentas — POST /
 * RF-003: Gestión del perfil — PUT /:id
 * RF-004: Visualización — GET /
 * RF-006: Configuración de permisos — DELETE /:id
 */
const express = require('express');
const router  = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');

// RF-004 / CU03: listar todos los usuarios
router.get('/',       getUsers);

// RF-003: obtener perfil detallado de un usuario
router.get('/:id',    getUserById);

// CU01 / RF-001: registrar nuevo usuario (estado 'pendiente')
router.post('/',      createUser);

// RF-003: actualizar perfil del usuario
router.put('/:id',    updateUser);

// RF-006: eliminar usuario del sistema
router.delete('/:id', deleteUser);

module.exports = router;
