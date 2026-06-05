# Requisitos Funcionales

---

## Módulo 1: Registro y Gestión de Usuarios

### RF-001: Creación de cuentas de usuario
- **Descripción:** El sistema debe permitir la creación de cuentas para estudiantes, padres, docentes, orientadores y administradores mediante formulario de registro.
- **Historia(s) relacionada(s):** HU-001, HU-005, HU-006
- **Entidad afectada:** Usuario
- **Prioridad:** Alta

### RF-002: Inicio de sesión
- **Descripción:** El sistema debe permitir que los usuarios inicien sesión utilizando credenciales únicas previamente registradas.
- **Historia(s) relacionada(s):** HU-002
- **Entidad afectada:** Usuario
- **Prioridad:** Alta

### RF-003: Gestión del perfil del estudiante
- **Descripción:** El sistema debe permitir almacenar, consultar y editar la información personal y académica del estudiante.
- **Historia(s) relacionada(s):** HU-001, HU-016, HU-018
- **Entidad afectada:** Estudiante
- **Prioridad:** Alta

### RF-004: Visualización de estudiantes
- **Descripción:** El sistema debe permitir que los orientadores visualicen la lista de estudiantes registrados en su institución.
- **Historia(s) relacionada(s):** HU-003
- **Entidad afectada:** Estudiante
- **Prioridad:** Alta

### RF-005: Validación institucional
- **Descripción:** El sistema debe validar que el usuario registrado pertenezca a una institución educativa pública de Medellín antes de activar su cuenta.
- **Historia(s) relacionada(s):** HU-004
- **Entidad afectada:** Usuario / Institución
- **Prioridad:** Alta

### RF-006: Configuración de permisos
- **Descripción:** El sistema debe permitir al administrador asignar y gestionar permisos de acceso según el rol del usuario.
- **Historia(s) relacionada(s):** HU-006, HU-028
- **Entidad afectada:** Rol
- **Prioridad:** Alta

---

## Módulo 2: Cuestionario y Evaluación de Competencias

### RF-007: Presentación del cuestionario
- **Descripción:** El sistema debe presentar un cuestionario interactivo con preguntas relacionadas con intereses, habilidades y preferencias vocacionales.
- **Historia(s) relacionada(s):** HU-007
- **Entidad afectada:** Cuestionario
- **Prioridad:** Alta

### RF-008: Guardado de progreso del cuestionario
- **Descripción:** El sistema debe permitir guardar el progreso parcial del cuestionario para que el estudiante pueda continuarlo posteriormente.
- **Historia(s) relacionada(s):** HU-008
- **Entidad afectada:** Cuestionario / Respuesta
- **Prioridad:** Alta

### RF-009: Registro de respuestas
- **Descripción:** El sistema debe almacenar en la base de datos las respuestas del cuestionario asociadas al estudiante.
- **Historia(s) relacionada(s):** HU-007, HU-008
- **Entidad afectada:** Respuesta
- **Prioridad:** Alta

### RF-010: Visualización de resultados por orientadores
- **Descripción:** El sistema debe permitir a los orientadores consultar los resultados de los cuestionarios de sus estudiantes.
- **Historia(s) relacionada(s):** HU-009
- **Entidad afectada:** Resultado
- **Prioridad:** Alta

### RF-011: Personalización del cuestionario
- **Descripción:** El sistema debe permitir a los administradores institucionales modificar o agregar preguntas al cuestionario.
- **Historia(s) relacionada(s):** HU-010
- **Entidad afectada:** Pregunta
- **Prioridad:** Media

### RF-012: Generación de retroalimentación automática
- **Descripción:** El sistema debe generar automáticamente una retroalimentación basada en los resultados obtenidos al finalizar el cuestionario.
- **Historia(s) relacionada(s):** HU-012
- **Entidad afectada:** Resultado
- **Prioridad:** Alta

---

## Módulo 3: Resultados y Perfil Vocacional

### RF-013: Cálculo de porcentajes de afinidad
- **Descripción:** El sistema debe calcular y mostrar porcentajes de afinidad hacia diferentes áreas académicas según las respuestas del cuestionario.
- **Historia(s) relacionada(s):** HU-013
- **Entidad afectada:** Resultado
- **Prioridad:** Alta

### RF-014: Visualización de carreras sugeridas
- **Descripción:** El sistema debe mostrar una descripción detallada de las carreras sugeridas incluyendo perfil, duración y campo laboral.
- **Historia(s) relacionada(s):** HU-014
- **Entidad afectada:** Carrera
- **Prioridad:** Alta

### RF-016: Visualización de resultados por padres
- **Descripción:** El sistema debe permitir a los padres vinculados visualizar los resultados del perfil vocacional del estudiante.
- **Historia(s) relacionada(s):** HU-016
- **Entidad afectada:** Resultado
- **Prioridad:** Alta

### RF-017: Comparación de resultados por grupo
- **Descripción:** El sistema debe permitir comparar los resultados vocacionales de estudiantes por grupo o grado académico.
- **Historia(s) relacionada(s):** HU-017
- **Entidad afectada:** Resultado
- **Prioridad:** Media

### RF-018: Almacenamiento de resultados
- **Descripción:** El sistema debe guardar los resultados del estudiante para que puedan ser consultados o actualizados posteriormente.
- **Historia(s) relacionada(s):** HU-018
- **Entidad afectada:** Resultado
- **Prioridad:** Alta

---

## Módulo 4: Tendencias del Mercado Laboral

### RF-019: Visualización de tendencias laborales
- **Descripción:** El sistema debe mostrar información actualizada sobre las carreras más demandadas en Medellín para apoyar la toma de decisiones vocacionales.
- **Historia(s) relacionada(s):** HU-019
- **Entidad afectada:** Tendencia Laboral
- **Prioridad:** Media

### RF-020: Estadísticas de empleabilidad local
- **Descripción:** El sistema debe presentar estadísticas del mercado laboral en Medellín que puedan ser consultadas por orientadores escolares.
- **Historia(s) relacionada(s):** HU-020
- **Entidad afectada:** Estadística Laboral
- **Prioridad:** Media

### RF-021: Información por sectores productivos
- **Descripción:** El sistema debe mostrar datos del mercado laboral organizados por sectores productivos como tecnología, salud o educación.
- **Historia(s) relacionada(s):** HU-021
- **Entidad afectada:** Sector
- **Prioridad:** Media

### RF-022: Consulta de estabilidad laboral para padres
- **Descripción:** El sistema debe permitir a los padres consultar información sobre oportunidades y estabilidad laboral de las carreras sugeridas.
- **Historia(s) relacionada(s):** HU-022
- **Entidad afectada:** Tendencia Laboral
- **Prioridad:** Media

### RF-023: Actualización de datos del mercado laboral
- **Descripción:** El sistema debe permitir al administrador actualizar periódicamente la información del mercado laboral para mantenerla vigente.
- **Historia(s) relacionada(s):** HU-023
- **Entidad afectada:** Tendencia Laboral
- **Prioridad:** Alta

### RF-024: Indicador de riesgo de automatización
- **Descripción:** El sistema debe indicar qué carreras presentan menor riesgo de ser reemplazadas por inteligencia artificial o automatización.
- **Historia(s) relacionada(s):** HU-024
- **Entidad afectada:** Carrera
- **Prioridad:** Media

---

## Módulo 5: Administración, Monitoreo y Gestión de Contenido

### RF-025: Panel de estadísticas globales
- **Descripción:** El sistema debe generar paneles de estadísticas generales sobre número de usuarios, cuestionarios completados y uso de módulos.
- **Historia(s) relacionada(s):** HU-025
- **Entidad afectada:** Estadística
- **Prioridad:** Alta

### RF-028: Gestión de roles y permisos
- **Descripción:** El sistema debe permitir administrar, modificar y asignar roles y permisos de acceso a los diferentes módulos.
- **Historia(s) relacionada(s):** HU-028
- **Entidad afectada:** Rol
- **Prioridad:** Alta

### RF-030: Notificaciones administrativas
- **Descripción:** El sistema debe generar notificaciones automáticas para administradores institucionales sobre nuevos registros o cuestionarios completados.
- **Historia(s) relacionada(s):** HU-030
- **Entidad afectada:** Notificación
- **Prioridad:** Media

---

## Módulo 6: Creación y Gestión de Encuestas

### RF-031: Creación de encuestas personalizadas
- **Descripción:** El sistema debe permitir a los administradores diseñar y publicar encuestas personalizadas dentro de la plataforma.
- **Historia(s) relacionada(s):** HU-031
- **Entidad afectada:** Encuesta
- **Prioridad:** Media

### RF-032: Edición y eliminación de encuestas
- **Descripción:** El sistema debe permitir editar o eliminar encuestas previamente creadas para mantener actualizados los instrumentos de diagnóstico.
- **Historia(s) relacionada(s):** HU-032
- **Entidad afectada:** Encuesta
- **Prioridad:** Media

### RF-033: Estadísticas de resultados de encuestas
- **Descripción:** El sistema debe mostrar estadísticas consolidadas de las respuestas obtenidas en las encuestas aplicadas.
- **Historia(s) relacionada(s):** HU-033
- **Entidad afectada:** Encuesta
- **Prioridad:** Media

### RF-034: Compartir encuestas con orientadores
- **Descripción:** El sistema debe permitir compartir encuestas creadas con orientadores escolares para su aplicación a grupos específicos.
- **Historia(s) relacionada(s):** HU-034
- **Entidad afectada:** Encuesta
- **Prioridad:** Media

### RF-035: Respuesta de encuestas institucionales
- **Descripción:** El sistema debe permitir que los orientadores respondan encuestas de diagnóstico institucional dentro de la plataforma.
- **Historia(s) relacionada(s):** HU-035
- **Entidad afectada:** Encuesta / Respuesta
- **Prioridad:** Media

---

## Módulo 7: Comunicación y Retroalimentación

### RF-036: Envío de comentarios y sugerencias
- **Descripción:** El sistema debe incluir un formulario que permita a los estudiantes enviar comentarios o sugerencias sobre su experiencia en la plataforma.
- **Historia(s) relacionada(s):** HU-036
- **Entidad afectada:** Comentario
- **Prioridad:** Media

### RF-037: Mensajería interna
- **Descripción:** El sistema debe permitir el envío de mensajes internos entre orientadores escolares y estudiantes para dar seguimiento personalizado.
- **Historia(s) relacionada(s):** HU-037
- **Entidad afectada:** Mensaje
- **Prioridad:** Media
