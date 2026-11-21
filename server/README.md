# Mi Camino — Backend unificado

Ver el README de la raíz. Resumen:
- Instalar desde la raíz del proyecto: `npm install` (workspaces).
- Variables de entorno en `server/.env` (plantilla: `.env.example` en la raíz).
- Esquema y datos: `database/micamino.sql` y `database/seed.sql`.
- Pool único: `db/pool.js` (`mysql2/promise`, usado por los Módulos A y B).
