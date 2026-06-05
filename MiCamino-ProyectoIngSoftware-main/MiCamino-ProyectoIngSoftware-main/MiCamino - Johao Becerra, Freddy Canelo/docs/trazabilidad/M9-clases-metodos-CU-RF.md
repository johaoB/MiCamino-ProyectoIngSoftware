# MATRICES DE TRAZABILIDAD
**Proyecto: Mi Camino — Orientación Vocacional**

## 9.9 Matriz de Trazabilidad: Clases → Métodos → CU → RF

| Clase | Método | CU | RF | Descripción |
|---|---|---|---|---|
| Usuario | iniciarSesion() | CU02 | RF-002 | Valida credenciales y genera sesión activa para el usuario |
| Usuario | cerrarSesion() | CU02 | RF-002 | Cierra la sesión activa del usuario y limpia el token |
| Usuario | editarPerfil() | CU03 | RF-003 | Permite al usuario actualizar su información personal |
| Institucion | validar() | CU04 | RF-005 | Verifica que la institución sea pública y pertenezca a Medellín |
| Institucion | listarUsuarios() | CU03 | RF-004 | Retorna la lista de usuarios registrados en la institución |
| Estudiante | registrar() | CU01 | RF-001 | Crea un nuevo registro de estudiante en el sistema |
| Estudiante | verPerfil() | CU03 | RF-003 | Muestra la información académica y personal del estudiante |
| Estudiante | vincularPadre() | CU05 | RF-001 | Genera y gestiona el código de vinculación con el padre |
| Cuestionario | iniciar() | CU07 | RF-007 | Carga y presenta el cuestionario al estudiante |
| Cuestionario | guardarProgreso() | CU08 | RF-008 | Almacena las respuestas parciales del estudiante |
| Cuestionario | personalizar() | CU10 | RF-011 | Permite al administrador agregar o modificar preguntas |
| Pregunta | agregar() | CU10 | RF-011 | Crea una nueva pregunta en el cuestionario |
| Pregunta | desactivar() | CU10 | RF-011 | Marca una pregunta como inactiva sin eliminarla físicamente |
| Respuesta | registrar() | CU08 | RF-009 | Almacena la respuesta del estudiante a una pregunta |
| Resultado | calcular() | CU12, CU13 | RF-012, RF-013 | Procesa las respuestas y calcula los porcentajes de afinidad por área |
| Resultado | mostrarPerfil() | CU13 | RF-013 | Presenta el perfil vocacional con gráficos de afinidad |
| Resultado | descargarPDF() | CU15 | RF-015 | Genera y descarga el informe PDF del perfil vocacional |
| Resultado | guardar() | CU17 | RF-018 | Persiste los resultados del estudiante en la base de datos |
| Carrera | listarSugeridas() | CU14 | RF-014 | Retorna las carreras sugeridas ordenadas por afinidad |
| Carrera | verDetalle() | CU14 | RF-014 | Muestra la descripción completa de una carrera específica |
| TendenciaLaboral | consultar() | CU18, CU19 | RF-019, RF-020 | Retorna las tendencias laborales actuales del mercado de Medellín |
| TendenciaLaboral | actualizar() | CU22 | RF-022 | Permite al administrador actualizar los datos del mercado laboral |
| TendenciaLaboral | consultarRiesgoIA() | CU23 | RF-023 | Muestra el nivel de riesgo de automatización por carrera |
| Administrador | gestionarPermisos() | CU06, CU26 | RF-006, RF-025 | Asigna y configura permisos de acceso por rol y módulo |
| Administrador | verEstadisticas() | CU24 | RF-024 | Muestra estadísticas globales de uso de la plataforma |
| Administrador | generarReporte() | CU26 | RF-026 | Genera reportes de participación por institución o comuna |
| Encuesta | crear() | CU28 | RF-031 | Crea una nueva encuesta personalizada en la plataforma |
| Encuesta | editar() | CU29 | RF-032 | Modifica una encuesta existente sin respuestas registradas |
| Encuesta | eliminar() | CU29 | RF-032 | Desactiva una encuesta; si tiene respuestas, no se borra físicamente |
| Encuesta | publicar() | CU28 | RF-031 | Cambia el estado de la encuesta a 'publicada' |
| Encuesta | asignarOrientadores() | CU31 | RF-034 | Asigna la encuesta a uno o varios orientadores |
| EstadisticaEncuesta | calcular() | CU30 | RF-033 | Calcula y actualiza las estadísticas de respuestas de la encuesta |
| EstadisticaEncuesta | filtrar() | CU30 | RF-033 | Filtra estadísticas por período, institución o perfil de respondente |
| Orientador | responderEncuesta() | CU32 | RF-035 | Registra las respuestas del orientador a una encuesta asignada |
| Orientador | exportarReporte() | CU27 | RF-027 | Genera y descarga el reporte grupal de resultados de estudiantes |
| Estudiante | enviarComentario() | CU33 | RF-036 | Registra el comentario o sugerencia del estudiante sobre la app |