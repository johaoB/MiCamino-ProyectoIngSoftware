# MATRICES DE TRAZABILIDAD
**Proyecto: Mi Camino — Orientación Vocacional**

## 9.12 Matriz de Trazabilidad: Pantallas → Roles → CU → RF → Wireframes

| Pantalla | Rol(es) | CU | RF | Wireframe |
|---|---|---|---|---|
| Landing / Inicio | Todos (no autenticado) | — | RF-001, RF-002 | W-01: Página de inicio con opciones Registrarse e Iniciar Sesión |
| Formulario Registro Estudiante | Estudiante | CU01 | RF-001 | W-02: Formulario con campos de datos personales y académicos |
| Formulario Registro Padre | Padre de Familia | CU05 | RF-001 | W-03: Formulario de registro con campo de código de vinculación |
| Inicio de Sesión | Todos | CU02 | RF-002 | W-04: Pantalla con campos de documento, contraseña y selector de rol |
| Confirmación de Cuenta | Estudiante, Padre | CU01, CU05 | RF-001 | W-05: Pantalla de confirmación indicando que se envió correo de activación |
| Vinculación Padre-Estudiante | Padre de Familia | CU05 | RF-001 | W-06: Pantalla para ingresar el código de vinculación del estudiante |
| Panel Principal Estudiante | Estudiante | CU07, CU13, CU18 | RF-007, RF-013, RF-019 | W-07: Dashboard con tarjetas de acceso rápido: Cuestionario, Resultados, Tendencias |
| Panel Orientador | Orientador Escolar | CU03, CU09, CU15, CU27 | RF-004, RF-010, RF-015, RF-027 | W-08: Tabla de estudiantes con filtros, botones Ver Resultados y Exportar Reporte |
| Panel Docente | Docente | CU11 | RF-017 | W-09: Lista de estudiantes con historial de competencias y métricas |
| Panel Acudiente | Padre de Familia | CU16, CU21 | RF-016, RF-022 | W-10: Panel con acceso al perfil vocacional del hijo y tendencias laborales |
| Panel Administrador | Administrador | CU04, CU06, CU24, CU26, CU28 | RF-005, RF-006, RF-024, RF-025, RF-031 | W-11: Panel con secciones de Usuarios, Permisos, Estadísticas y Encuestas |
| Recuperación de Contraseña | Todos | CU02 | RF-002 | W-12: Formulario para ingresar correo y recibir enlace de recuperación |
| Gestión de Registros Pendientes | Administrador | CU04 | RF-005 | W-13: Lista de solicitudes con botones Aceptar y Denegar por fila |
| Configuración de Permisos | Administrador | CU06, CU26 | RF-006, RF-025 | W-14: Matriz de permisos por rol con toggles de activación por módulo |
| Estadísticas Globales | Administrador | CU24 | RF-024 | W-15: Panel con gráficos de usuarios activos, cuestionarios completados y uso por módulo |
| Cuestionario Vocacional | Estudiante | CU07, CU08 | RF-007, RF-008, RF-009 | W-16: Una pregunta por pantalla, barra de progreso, botones Anterior/Siguiente y Guardar y Salir |
| Mis Resultados | Estudiante, Padre | CU13, CU14, CU16 | RF-013, RF-014, RF-016 | W-17: Gráfico de afinidad por áreas, lista de carreras sugeridas y botón Descargar PDF |
| Tendencias Laborales | Estudiante, Orientador, Padre, Docente | CU18, CU19, CU21, CU23 | RF-019, RF-020, RF-021, RF-022, RF-023 | W-18: Listado de carreras demandadas, sectores productivos y nivel de riesgo IA |
| Perfil de Usuario | Todos | CU03 | RF-003 | W-19: Formulario editable con datos personales y académicos del usuario |
| Mensajes / Comentarios | Estudiante | CU33 | RF-036 | W-20: Formulario de retroalimentación con categoría y campo de texto libre |
| Detalle de Carrera | Estudiante | CU14 | RF-014 | W-21: Descripción completa de la carrera: perfil, duración, campo laboral y demanda |
| Perfil del Hijo (Acudiente) | Padre de Familia | CU16 | RF-016 | W-22: Resumen del perfil vocacional del estudiante vinculado con gráficos de afinidad |
| Perfil del Estudiante (Orientador) | Orientador Escolar | CU09, CU15 | RF-010, RF-015 | W-23: Detalle del estudiante con resultados, métricas y botón de descarga PDF |
| Lista de Estudiantes (Docente) | Docente | CU11 | RF-017 | W-24: Tabla de estudiantes con columnas de competencias destacadas y comparativa grupal |
| Gestión de Cuestionarios | Administrador | CU10 | RF-011 | W-25: Vista de cuestionarios activos con opción de agregar/editar preguntas |