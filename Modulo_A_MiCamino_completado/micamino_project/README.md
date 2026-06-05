# Mi Camino — Módulo A (Orientación Vocacional)

Aplicación full-stack (React + Node.js/Express + MySQL) que implementa el **Módulo A** del proyecto universitario *Mi Camino*. El módulo expone una arquitectura **MVC** completa sobre la base de datos `micamino`, con un panel de administración (CRUDL) para gestionar las entidades del dominio de orientación vocacional.

---

## 1. Requisitos previos

- **Node.js** 18 o superior y **npm**
- **MySQL** 8.x (o MariaDB 10.x) corriendo en `localhost:3306`
  - Usuario: `root`
  - Contraseña: *(vacía)*
- Cliente de línea de comandos `mysql` (para importar el esquema y los datos)

> **Nota sobre `localhost`:** durante el desarrollo en el entorno de Abacus AI Agent, `localhost` se refiere a la máquina virtual del agente, no a tu computadora. Para ejecutar el proyecto en tu equipo, descarga todos los archivos con el ícono **"Files"** (arriba a la derecha), entra a la carpeta descargada e inicia la aplicación localmente siguiendo los pasos de abajo.

---

## 2. Estructura del proyecto

```
micamino_project/
├── package.json              # Lanzador unificado (concurrently) backend + frontend
├── .env.example              # Plantilla de variables de entorno
├── backend/
│   ├── server.js             # Punto de entrada de Express
│   ├── config/database.js    # Pool de conexión a MySQL (mysql2/promise)
│   ├── models/               # 10 modelos (capa de acceso a datos)
│   ├── controllers/          # 10 controladores (lógica de negocio)
│   ├── routes/index.js       # Definición de todas las rutas REST
│   └── sql/
│       ├── micamino_schema.sql  # Esquema completo de la BD (24 tablas)
│       └── seed.sql             # Datos de demostración
└── frontend/
    └── src/
        ├── App.jsx           # Panel de administración + navegación
        ├── pages/            # CarrerasCRUD.jsx, IntentosCRUD.jsx
        ├── services/api.js   # Cliente HTTP (fetch) hacia el backend
        └── styles/main.css
```

---

## 3. Configuración de la base de datos

Desde la carpeta raíz del proyecto, importa primero el **esquema** y luego los **datos de demostración**:

```bash
# 1) Crear / cargar el esquema (crea la BD "micamino" y sus 24 tablas)
mysql -u root < backend/sql/micamino_schema.sql

# 2) Cargar datos de demostración (áreas, carreras, preguntas, estudiantes, etc.)
mysql -u root micamino < backend/sql/seed.sql
```

> Si tu MySQL usa contraseña, añade `-p` a los comandos y configura las variables de entorno (ver sección 4).

---

## 4. Variables de entorno (opcional)

Los valores por defecto ya apuntan a `root` sin contraseña en `localhost:3306` / BD `micamino`, por lo que **la app funciona sin configuración adicional**. Si necesitas personalizar, copia la plantilla:

```bash
cp .env.example backend/.env      # ajusta credenciales del backend
```

Variables del backend (`backend/.env`):

| Variable      | Valor por defecto              | Descripción                  |
|---------------|--------------------------------|------------------------------|
| `PORT`        | `4000`                         | Puerto del servidor Express  |
| `CORS_ORIGIN` | `http://localhost:3000`        | Origen permitido (frontend)  |
| `DB_HOST`     | `localhost`                    | Host de MySQL                |
| `DB_PORT`     | `3306`                         | Puerto de MySQL              |
| `DB_NAME`     | `micamino`                     | Nombre de la base de datos   |
| `DB_USER`     | `root`                         | Usuario de MySQL             |
| `DB_PASSWORD` | *(vacío)*                      | Contraseña de MySQL          |

Variable del frontend (`frontend/.env`):

| Variable             | Valor por defecto                | Descripción              |
|----------------------|----------------------------------|--------------------------|
| `REACT_APP_API_URL`  | `http://localhost:4000/api`      | URL base de la API REST  |

---

## 5. Instalación y ejecución

```bash
# 1) Instalar dependencias de backend y frontend
npm install            # instala 'concurrently' en la raíz
npm run install:all    # instala dependencias de backend/ y frontend/

# 2) Iniciar todo (backend en :4000 y frontend en :3000)
npm start
```

- Backend (API REST): **http://localhost:4000**
- Frontend (React): **http://localhost:3000**

También puedes iniciar cada parte por separado:

```bash
npm start --prefix backend     # solo API
npm start --prefix frontend    # solo React
```

---

## 6. Arquitectura MVC

El módulo implementa **10 entidades** con arquitectura MVC (Modelo → Controlador → Rutas):

### Tablas MAESTRAS (5)
| Entidad             | CRUD backend | UI React (CRUDL) |
|---------------------|:------------:|:----------------:|
| **Carrera**         | ✅           | ✅ *(interfaz completa)* |
| Area                | ✅           | —                |
| Pregunta            | ✅           | —                |
| Opcion_Respuesta    | ✅           | —                |
| Cuestionario        | ✅           | —                |

### Tablas TRANSACCIONALES (5)
| Entidad                  | CRUD backend | UI React (CRUDL) |
|--------------------------|:------------:|:----------------:|
| **Intento_Cuestionario** | ✅           | ✅ *(interfaz completa con dropdowns de claves foráneas)* |
| Respuesta                | ✅           | —                |
| Resultado                | ✅           | —                |
| Afinidad_Academica       | ✅           | —                |
| Recomendacion            | ✅           | —                |

> La interfaz de **Intento_Cuestionario** muestra *dropdowns* poblados desde la BD para seleccionar el **estudiante** y el **cuestionario** (claves foráneas), cumpliendo el requisito de mostrar relaciones FK en la UI.

---

## 7. Endpoints principales de la API

Base: `http://localhost:4000/api`

| Método | Ruta                         | Descripción                       |
|--------|------------------------------|-----------------------------------|
| GET    | `/health`                    | Estado del servidor               |
| —      | `/carreras`                  | CRUD de Carrera                   |
| —      | `/areas`                     | CRUD de Area                      |
| —      | `/preguntas`                 | CRUD de Pregunta                  |
| —      | `/opciones`                  | CRUD de Opcion_Respuesta          |
| —      | `/cuestionarios`             | CRUD de Cuestionario              |
| GET    | `/cuestionarios/activo`      | Cuestionario activo               |
| —      | `/intentos`                  | CRUD de Intento_Cuestionario      |
| —      | `/respuestas`                | CRUD de Respuesta                 |
| —      | `/resultados`                | CRUD de Resultado                 |
| —      | `/afinidades`                | CRUD de Afinidad_Academica        |
| —      | `/recomendaciones`           | CRUD de Recomendacion             |
| GET    | `/estudiantes`               | Lista de estudiantes (apoyo a UI) |

Cada recurso CRUD soporta: `GET /` (listar), `GET /:id` (obtener), `POST /` (crear), `PUT /:id` (actualizar), `DELETE /:id` (eliminar).

---

## 8. Reglas de negocio (implementadas en código real)

Las siguientes reglas están codificadas en los controladores/modelos (no en comentarios):

1. **Máximo 3 intentos por estudiante por día** — `IntentoCuestionario.crear` verifica `contarIntentosDelDia()` y devuelve **409** si se excede.
2. **Coherencia opción↔pregunta** — `Respuesta.crear` valida que la opción seleccionada pertenezca a la pregunta respondida (`opcionPerteneceAPregunta()`); de lo contrario devuelve **400**.
3. **Rango de porcentaje y tope de recomendaciones** — `AfinidadAcademica.crear` exige que el porcentaje esté entre **0 y 100**; `Recomendacion.crear` limita a **3 recomendaciones por resultado**.

---

## 9. Trazabilidad

**Todos** los métodos de modelos y controladores incluyen un comentario de trazabilidad con el formato:

```
// CU-XX | RF-XX | EXX - nombreMetodo()
```

que vincula cada método con su **Caso de Uso (CU)**, **Requisito Funcional (RF)** y **Entidad (E)** correspondientes según la documentación del proyecto.

---

## 10. Notas

- Stack: **React** (frontend), **Node.js + Express** (backend), **MySQL** vía **mysql2/promise** (pool de conexiones).
- Validación de datos y manejo de errores de integridad referencial (`ER_ROW_IS_REFERENCED_2`, `ER_NO_REFERENCED_ROW_2`).
- El esquema completo de la base de datos se incluye en `backend/sql/micamino_schema.sql`.
