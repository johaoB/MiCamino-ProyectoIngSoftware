# MATRICES DE TRAZABILIDAD
**Proyecto: Mi Camino — Orientación Vocacional**

## 9.13 Matriz de Trazabilidad: Prototipo → Wireframes → Interacciones → Pantallas Destino

| Prototipo | Wireframe | Interacción | Pantalla Destino |
|---|---|---|---|
| P-01: Landing / Inicio | W-01 | Clic 'Registrarse' (estudiante) | W-02: Formulario Registro Estudiante |
| P-01: Landing / Inicio | W-01 | Clic 'Registrarse' (padre) | W-03: Formulario Registro Padre |
| P-01: Landing / Inicio | W-01 | Clic 'Iniciar Sesión' | W-04: Pantalla de Inicio de Sesión |
| P-02: Registro Estudiante | W-02 | Completar formulario → clic 'Registrarse' | W-05: Confirmación de cuenta (correo enviado) |
| P-03: Registro Padre | W-03 | Completar formulario → clic 'Registrarse' | W-06: Vinculación con código de estudiante |
| P-04: Inicio de Sesión | W-04 | Ingresar credenciales → seleccionar rol Estudiante → clic 'Iniciar Sesión' | W-07: Panel Principal Estudiante |
| P-04: Inicio de Sesión | W-04 | Ingresar credenciales → seleccionar rol Orientador → clic 'Iniciar Sesión' | W-08: Panel Orientador (lista de estudiantes) |
| P-04: Inicio de Sesión | W-04 | Ingresar credenciales → seleccionar rol Docente → clic 'Iniciar Sesión' | W-09: Panel Docente |
| P-04: Inicio de Sesión | W-04 | Ingresar credenciales → seleccionar rol Padre/Acudiente → clic 'Iniciar Sesión' | W-10: Panel Acudiente |
| P-04: Inicio de Sesión | W-04 | Ingresar credenciales → seleccionar rol Administrador → clic 'Iniciar Sesión' | W-11: Panel Administrador |
| P-04: Inicio de Sesión | W-04 | Credenciales inválidas o cuenta bloqueada | W-04: Mensaje de error en pantalla |
| P-04: Inicio de Sesión | W-04 | Clic 'Recuperar contraseña' | W-12: Pantalla recuperación de contraseña |
| P-05: Panel Administrador | W-11 | Clic 'Usuarios' → ver solicitudes pendientes | W-13: Lista de registros pendientes con botones Aceptar / Denegar |
| P-05: Panel Administrador | W-11 | Clic 'Aceptar' en solicitud | W-13: Estado actualizado a 'Activo'; confirmación en pantalla |
| P-05: Panel Administrador | W-11 | Clic 'Denegar' en solicitud | W-13: Estado actualizado a 'Denegado'; confirmación en pantalla |
| P-05: Panel Administrador | W-11 | Clic 'Gestión de permisos' | W-14: Pantalla configuración de permisos por rol |
| P-05: Panel Administrador | W-11 | Clic 'Estadísticas globales' | W-15: Panel de estadísticas globales con filtros |
| P-06: Panel Principal Estudiante | W-07 | Clic 'Iniciar Quiz/Test Vocacional' | W-16: Cuestionario vocacional (primera pregunta) |
| P-06: Panel Principal Estudiante | W-07 | Clic 'Resultados del Test' | W-17: Mis Resultados (perfil vocacional) |
| P-06: Panel Principal Estudiante | W-07 | Clic 'Tendencias Laborales' | W-18: Pantalla de tendencias del mercado laboral |
| P-06: Panel Principal Estudiante | W-07 | Clic 'Perfil' (menú lateral) | W-19: Perfil del estudiante (datos personales) |
| P-06: Panel Principal Estudiante | W-07 | Clic 'Mensajes' (menú lateral) | W-20: Historial de mensajes / comentarios |
| P-07: Cuestionario Vocacional | W-16 | Seleccionar respuesta → clic 'Next' | W-16: Siguiente pregunta del cuestionario |
| P-07: Cuestionario Vocacional | W-16 | Clic 'Previous' | W-16: Pregunta anterior del cuestionario |
| P-07: Cuestionario Vocacional | W-16 | Clic 'Save and Exit' | W-07: Panel Principal Estudiante (progreso guardado) |
| P-07: Cuestionario Vocacional | W-16 | Pregunta obligatoria sin responder → clic 'Next' | W-16: Mensaje de validación 'Debes responder esta pregunta' |
| P-07: Cuestionario Vocacional | W-16 | Responder última pregunta → clic 'Next' | W-17: Retroalimentación / Mis Resultados |
| P-08: Mis Resultados | W-17 | Clic 'Download PDF' | Descarga de reporte PDF con perfil vocacional |
| P-08: Mis Resultados | W-17 | Clic 'View Details' en carrera sugerida | W-21: Detalle de carrera (descripción, demanda, riesgo) |
| P-08: Mis Resultados | W-17 | Clic 'Job Trends' (footer) | W-18: Pantalla de tendencias laborales |
| P-08: Mis Resultados | W-17 | Sin resultados disponibles (cuestionario no completado) | W-17: Mensaje 'Aún no has completado el cuestionario' |
| P-09: Panel Acudiente | W-10 | Clic 'Ver Progreso de mi Hijo' | W-22: Perfil del hijo con resultados vocacionales |
| P-09: Panel Acudiente | W-10 | Clic 'Perfil' (menú lateral) | W-19: Perfil del acudiente |
| P-10: Panel Orientador | W-08 | Clic 'Ver' en fila de estudiante | W-23: Perfil del estudiante con resultados y métricas |
| P-10: Panel Orientador | W-08 | Clic 'Mensaje' en fila de estudiante | W-20: Pantalla de mensajes con el estudiante |
| P-10: Panel Orientador | W-08 | Buscar estudiante por nombre | W-08: Lista filtrada de estudiantes |
| P-10: Panel Orientador | W-08 | Clic 'Exportar resultados grupales' | Descarga de reporte PDF/Excel del grupo |
| P-11: Panel Docente | W-09 | Clic 'Visualizar Estudiantes' | W-24: Lista de estudiantes con historial y métricas |
| P-11: Panel Docente | W-09 | Clic 'Visualizar Cuestionarios' | W-25: Vista de cuestionarios activos y estadísticas |
| P-11: Panel Docente | W-09 | Clic 'Perfil' (menú lateral) | W-19: Perfil del docente |