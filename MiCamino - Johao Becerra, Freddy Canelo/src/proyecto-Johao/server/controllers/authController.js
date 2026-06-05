/**
 * authController.js
 * Controlador de Autenticación
 *
 * Trazabilidad:
 *  - CU02 – Iniciar Sesión como Estudiante
 *  - RF-002: Inicio de sesión
 *  - Diagrama de Secuencia CU02: Iniciar Sesión como Estudiante
 *    (DiagramadeSecuencia2.jpeg)
 */

const UserModel = require('../models/userModel');

/**
 * login
 * CU02 – Iniciar Sesión como Estudiante | RF-002
 * DS-CU02: Paso 4 autenticarUsuario(correo, password)
 *   → Paso 5 obteneDatosSeguridadcorreo) [getByEmail]
 *   → Flujo Normal: Credenciales Válidas AND Estado Activo
 *     → Paso 11 loginExitoso(token, redirección)
 *   → Flujo Alterno 5a: Credenciales Inválidas
 *     → registrarIntentofallido / mostrarErrorGenérico
 *   → Flujo Alterno 5b: Estado No Activo (pendiente / denegado)
 *     → errorEstado(estadoCuenta, mensajeAyuda)
 */
const login = async (req, res) => {
  try {
    // DS-CU02 Paso 3: ingresarCredenciales(correo, password)
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });

    // DS-CU02 Paso 5: obteneDatosSeguridadcorreo) — consulta usuario + hash
    const user = await UserModel.getByEmail(email);

    // DS-CU02 Flujo Alterno 5a: El usuario no existe OR los hashes no coinciden
    if (!user || user.password !== password)
      return res.status(401).json({ message: 'Credenciales incorrectas' });

    // DS-CU02 Flujo Alterno 5b: estado 'Pendiente' → errorEstado
    if (user.estado === 'pendiente')
      return res.status(403).json({ message: 'Tu cuenta está pendiente de aprobación.' });

    // DS-CU02 Flujo Alterno 5b: estado 'denegado' → errorEstado
    if (user.estado === 'denegado')
      return res.status(403).json({ message: 'Tu cuenta fue denegada. Contacta al administrador.' });

    // DS-CU02 Paso 11: loginExitoso — devolver datos seguros (sin contraseña)
    const { password: _, ...safeUser } = user;
    res.json({ message: 'Login exitoso', user: safeUser });
  } catch (err) {
    res.status(500).json({ message: 'Error interno', error: err.message });
  }
};

module.exports = { login };
