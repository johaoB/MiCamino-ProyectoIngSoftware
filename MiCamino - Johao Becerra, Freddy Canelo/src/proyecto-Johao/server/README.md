# Mi Camino — Backend

## Configuración de la base de datos

1. Importar el esquema en MySQL:
```bash
mysql -u root -p < ../micamino.sql
```

2. Poblar con datos iniciales:
```bash
mysql -u root -p micamino < db/seed.sql
```

3. Crear tu archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

4. Instalar dependencias y arrancar:
```bash
npm install
npm run dev
```

## Pool de conexiones
- Driver: `mysql2/promise`
- Pool de 10 conexiones configurado en `db/pool.js`
- Variables de entorno: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
