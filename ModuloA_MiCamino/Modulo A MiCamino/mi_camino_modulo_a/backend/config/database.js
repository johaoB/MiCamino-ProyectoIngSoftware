// Importamos la librería pg para poder conectarnos a PostgreSQL.
const { Pool } = require('pg');

// Cargamos variables de entorno desde el archivo .env.
require('dotenv').config();

// Creamos un pool de conexiones para reutilizar conexiones y mejorar rendimiento.
const pool = new Pool({
  // Host donde está PostgreSQL (por defecto localhost).
  host: process.env.DB_HOST || 'localhost',
  // Puerto donde escucha PostgreSQL (por defecto 5432).
  port: Number(process.env.DB_PORT || 5432),
  // Nombre de la base de datos del módulo.
  database: process.env.DB_NAME || 'mi_camino_modulo_a',
  // Usuario de PostgreSQL.
  user: process.env.DB_USER || 'postgres',
  // Contraseña del usuario de PostgreSQL.
  password: process.env.DB_PASSWORD || 'postgres',
  // Cantidad máxima de conexiones simultáneas en el pool.
  max: 10,
  // Tiempo máximo en milisegundos para esperar una conexión libre.
  connectionTimeoutMillis: 5000
});

// Exportamos el pool para usarlo en modelos/controladores.
module.exports = pool;
