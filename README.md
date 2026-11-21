# Mi Camino – Orientación Vocacional (proyecto unificado)

Proyecto único que une:
- **Módulo B (Johao Becerra)** – base del sistema: login/registro, aprobación de cuentas y páginas por rol (estudiante, profesor, orientador, padre, admin) + cuestionario rápido.
- **Módulo A (Freddy Palacio)** – cuestionario y resultados: API CRUD completa (carreras, áreas, preguntas, opciones, cuestionarios, intentos, respuestas, resultados, afinidades, recomendaciones) y paneles CRUDL de Carreras e Intentos. Se abre desde el botón **"Realizar prueba vocacional"** del panel del estudiante (`/usuario/prueba`).

Stack: Node.js + Express (MVC) · MySQL/MariaDB (`micamino`, una sola BD) · React + Vite.

## Estructura
```
package.json        # npm workspaces: UN solo "npm install" instala server + client
database/
  micamino.sql      # esquema único (24 tablas)
  seed.sql          # datos base B + demo A (idempotente)
server/             # Express único (puerto 5000)
  app.js            # monta rutas de B (/api/users, /auth, /encuesta, /padre, /admin, /institucion)
                    # y de A (/api/carreras, /intentos, /cuestionarios, ...)
  db/pool.js        # único pool mysql2 usado por ambos módulos
  models/ controllers/ routes/   # archivos de B (minúscula) + archivos de A (PascalCase / moduloARoutes.js)
client/             # React + Vite (puerto 5173, proxy /api -> 5000)
  src/pages/ModuloA/  # ModuloAPage, CarrerasCRUD, IntentosCRUD, moduloA.css
```

## Puesta en marcha
```bash
npm install                      # instala TODAS las dependencias (raíz, server y client)
cp .env.example server/.env      # ajustar credenciales si hace falta
npm run db:setup                 # crea la BD y carga datos (requiere cliente mysql en PATH)
npm run dev                      # arranca servidor (5000) y cliente (5173)
```
Sin cliente `mysql`, importar `database/micamino.sql` y luego `database/seed.sql` desde Workbench/phpMyAdmin.

Usuarios de prueba: admin `johao@email.com` / `1234` · estudiantes `ana.gomez@demo.edu.co`, `carlos.perez@demo.edu.co`, `lucia.martinez@demo.edu.co` / `demo123`.

## Cambios hechos para la unión (el resto del código se dejó tal cual)
1. **BD única**: esquema idéntico en ambas partes; se agregó `usuario.estado` (el código del Módulo B lo usa para aprobar/denegar cuentas y no existía en el dump). Seed fusionado.
2. **Un solo servidor y un solo pool**: los modelos/controladores de A usan `server/db/pool.js` (se añadió `decimalNumbers: true` de A).
3. **Estados en minúscula** (`en_progreso`, `completado`, `activo`) en los CRUD de A, para coincidir con lo que escribe/lee el Módulo B.
4. **Frontend de A portado de Create React App a Vite**: `App.jsx` → `ModuloAPage.jsx` (sin su propio router), `fetch` apunta a `/api`, CSS encapsulado en `.modulo-a`.
5. **Botón del estudiante** (`UsuarioPage.jsx`) ahora abre el Módulo A; desde ahí hay un botón para volver al cuestionario rápido del Módulo B.
6. Dependencias: se eliminaron `react-scripts` y los `package.json` duplicados; `client/client` (copia duplicada) no se incluyó.
