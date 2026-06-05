# MATRICES DE TRAZABILIDAD
**Proyecto: Mi Camino — Orientación Vocacional**

## 9.1 Matriz de Trazabilidad: Entidades Externas → RF → CU → DCA

| Entidad Externa | RF | Descripción RF | CU | Descripción CU | Acción en DCA |
|---|---|---|---|---|---|
| Estudiante | RF-001 | Creación de cuentas | CU01 | Registrar estudiante | El estudiante completa el formulario de registro en la plataforma |
| Estudiante | RF-002 | Inicio de sesión | CU02 | Iniciar sesión | El estudiante ingresa sus credenciales para acceder al sistema |
| Estudiante | RF-003 | Gestión del perfil | CU03 | Editar perfil | El estudiante actualiza su información personal y académica |
| Estudiante | RF-007 | Presentación del cuestionario | CU07 | Responder cuestionario vocacional | El estudiante responde el cuestionario de orientación vocacional |
| Estudiante | RF-008 | Guardado de progreso | CU08 | Guardar progreso del cuestionario | El estudiante guarda su avance para continuar después |
| Estudiante | RF-009 | Registro de respuestas | CU08 | Guardar progreso del cuestionario | El sistema almacena las respuestas del estudiante en la BD |
| Estudiante | RF-012 | Retroalimentación automática | CU12 | Recibir retroalimentación | El estudiante recibe retroalimentación al finalizar el cuestionario |
| Estudiante | RF-013 | Cálculo de porcentajes de afinidad | CU13 | Visualizar perfil vocacional | El estudiante visualiza su perfil vocacional con porcentajes de afinidad |
| Estudiante | RF-014 | Visualización de carreras sugeridas | CU14 | Explorar carreras sugeridas | El estudiante consulta las carreras recomendadas según su perfil |
| Estudiante | RF-018 | Almacenamiento de resultados | CU17 | Guardar resultados vocacionales | El sistema guarda los resultados para consulta futura del estudiante |
| Estudiante | RF-019 | Tendencias laborales | CU18 | Consultar tendencias laborales | El estudiante consulta las carreras más demandadas en Medellín |
| Estudiante | RF-023 | Riesgo de automatización | CU23 | Consultar riesgo IA | El estudiante consulta qué carreras tienen menor riesgo de automatización |
| Orientador Escolar | RF-004 | Visualización de estudiantes | CU03 | Visualizar lista de estudiantes | El orientador accede al panel con los estudiantes de su institución |
| Orientador Escolar | RF-010 | Resultados por orientadores | CU09 | Revisar resultados de estudiantes | El orientador consulta los resultados del cuestionario de sus estudiantes |
| Orientador Escolar | RF-015 | Descarga de informe PDF | CU15 | Descargar informe PDF | El orientador descarga el informe vocacional en formato PDF |
| Orientador Escolar | RF-020 | Estadísticas de empleabilidad | CU19 | Consultar estadísticas laborales | El orientador consulta estadísticas del mercado laboral de Medellín |
| Orientador Escolar | RF-027 | Exportación de reportes grupales | CU27 | Exportar reporte grupal | El orientador exporta un reporte con los resultados de su grupo |
| Orientador Escolar | RF-035 | Responder encuesta institucional | CU32 | Responder encuesta institucional | El orientador responde encuestas de diagnóstico asignadas |
| Padre de Familia | RF-001 | Creación de cuentas | CU05 | Registrar padre/acudiente | El padre crea su cuenta vinculada al estudiante |
| Padre de Familia | RF-016 | Resultados por padres | CU16 | Ver resultados del hijo | El padre consulta el perfil vocacional del estudiante vinculado |
| Padre de Familia | RF-022 | Consulta de estabilidad laboral | CU21 | Consultar oportunidades laborales | El padre consulta información sobre estabilidad laboral de carreras |
| Administrador | RF-005 | Validación institucional | CU04 | Validar registro institucional | El administrador aprueba o rechaza registros de nuevos usuarios |
| Administrador | RF-006 | Configuración de permisos | CU06 | Gestionar permisos por rol | El administrador asigna permisos de acceso según el rol del usuario |
| Administrador | RF-011 | Personalización del cuestionario | CU10 | Personalizar preguntas | El administrador modifica o agrega preguntas al cuestionario |
| Administrador | RF-022 | Actualización datos laborales | CU22 | Actualizar datos del mercado laboral | El administrador actualiza periódicamente la información laboral |
| Administrador | RF-024 | Estadísticas globales | CU24 | Visualizar estadísticas globales | El administrador consulta métricas generales de uso de la plataforma |
| Administrador | RF-025 | Permisos por módulo | CU26 | Configurar permisos por módulo | El administrador configura el acceso a módulos según el rol |
| Administrador | RF-031 | Diseño de encuestas | CU28 | Crear encuesta personalizada | El administrador diseña y publica encuestas dentro de la plataforma |
| Administrador | RF-032 | Edición y eliminación de encuestas | CU29 | Editar o eliminar encuesta | El administrador edita o elimina encuestas previamente creadas |
| Administrador | RF-033 | Estadísticas de encuestas | CU30 | Visualizar estadísticas de encuestas | El administrador consulta resultados agregados de las encuestas |
| Administrador | RF-034 | Compartir encuesta | CU31 | Compartir encuesta con orientadores | El administrador asigna encuestas a orientadores específicos |
| Administrador | RF-036 | Reportes automáticos de errores | CU33 | Recibir reportes de errores | El administrador recibe reportes automáticos de errores del sistema |