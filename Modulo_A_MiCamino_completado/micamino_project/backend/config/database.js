// ============================================================
// Configuración de conexión a MySQL para Mi Camino - Módulo A
// Usa mysql2 con pool de conexiones y soporte de promesas (async/await).
// ============================================================

// Importamos mysql2 en su variante con promesas para usar async/await.
const mysql = require('mysql2/promise');

// Cargamos las variables de entorno desde el archivo .env.
require('dotenv').config();

// Creamos un pool de conexiones reutilizable para mejorar el rendimiento.
const pool = mysql.createPool({
  // Host donde corre MySQL (por defecto localhost).
  host: process.env.DB_HOST || 'localhost',
  // Puerto en el que escucha MySQL (por defecto 3306).
  port: Number(process.env.DB_PORT || 3306),
  // Usuario de MySQL (por defecto root, según la configuración del proyecto).
  user: process.env.DB_USER || 'root',
  // Contraseña del usuario (vacía por defecto, como pide el enunciado).
  password: process.env.DB_PASSWORD || '',
  // Nombre de la base de datos del proyecto.
  database: process.env.DB_NAME || 'micamino',
  // Esperar por una conexión libre cuando el pool esté ocupado.
  waitForConnections: true,
  // Cantidad máxima de conexiones simultáneas en el pool.
  connectionLimit: 10,
  // Sin límite en la cola de peticiones pendientes.
  queueLimit: 0,
  // Convertir decimales a número de JS para cálculos directos.
  decimalNumbers: true
});

// Pequeña verificación de conexión al iniciar (no detiene el server si falla).
pool.getConnection()
  .then((conn) => {
    console.log('  ✅  Conexión a MySQL establecida (base de datos: ' + (process.env.DB_NAME || 'micamino') + ')');
    conn.release();
  })
  .catch((err) => {
    console.error('  ⚠️   No se pudo conectar a MySQL:', err.message);
    console.error('       Verifica que MySQL esté activo y que la BD "micamino" exista.');
  });

// Exportamos el pool para usarlo en los modelos.
module.exports = pool;
