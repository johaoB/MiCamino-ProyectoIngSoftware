# CASOS DE USO
<br>

## MÓDULO 1: Registro y Gestión de Usuarios

### CU01 – Registrar Estudiante
|  |  |
|:--|:--|
|ID | CU01 |
|Nombre	| Registrar Estudiante |
|Actor(es)	| Estudiante |
|Descripción | El estudiante completa el formulario de registro con sus datos personales y académicos para crear una cuenta en el sistema vocacional. |
|Precondiciones	| 1. El estudiante no posee una cuenta registrada en el sistema. <br><br>2. El sistema se encuentra disponible y accesible. |
|Flujo Normal  | 1. El estudiante accede a la página de registro. <br><br>2. El sistema muestra el formulario de registro con campos obligatorios. <br><br>3. El estudiante completa los campos personales y académicos. <br><br>4. El estudiante envía el formulario. <br><br>5. El sistema valida la información ingresada. <br><br>6. El sistema crea la cuenta y envía un correo de confirmación al estudiante. <br><br>7. El sistema redirige al estudiante a la pantalla de confirmación exitosa. |
|Flujos Alternos / Excepciones | 3a. El estudiante omite campos obligatorios → el sistema resalta los campos vacíos y solicita completarlos antes de continuar. <br><br>5a. Uno o más datos no cumplen el formato esperado → el sistema muestra el error específico junto al campo correspondiente. <br><br>5b. Ya existe una cuenta con el mismo correo o número de identificación → el sistema informa el duplicado y ofrece la opción de iniciar sesión o recuperar contraseña. |
|Postcondiciones | 1. La cuenta del estudiante queda creada con estado 'pendiente de validación'. <br><br>2. Se genera un registro de auditoría del nuevo usuario.| 
|🔗 Trazabilidad RF: | RF-01 Registro de usuarios, RF-02 Validación de datos de formulario.|

---
<br><br>

### CU02 – Iniciar Sesión como Estudiante
|  |  |
|:--|:--|
|ID | CU02 |
|Nombre | Iniciar Sesión como Estudiante |
|Actor(es) | Estudiante |
|Descripción | El estudiante ingresa sus credenciales para autenticarse en el sistema y acceder a su panel personal. |
|Precondiciones | 1. El estudiante posee una cuenta activa y validada. <br><br>2. El sistema está disponible. |
|Flujo Normal | 1. El estudiante accede a la página de inicio de sesión. <br><br>2. El sistema muestra el formulario de autenticación. <br><br>3. El estudiante ingresa su usuario y contraseña. <br><br>4. El estudiante confirma el envío. <br><br>5. El sistema valida las credenciales contra la base de datos. <br><br>6. El sistema crea la sesión y redirige al estudiante al panel principal. |
|Flujos Alternos / Excepciones | 5a. Las credenciales no coinciden → el sistema muestra un mensaje genérico de error sin revelar cuál campo es incorrecto. Después de 5 intentos fallidos, bloquea la cuenta temporalmente. <br><br>5b. La cuenta está bloqueada o pendiente de validación → el sistema muestra el estado de la cuenta y los pasos para resolver la situación. |
|Postcondiciones | 1. Se crea una sesión activa para el estudiante. <br><br>2. Se registra la fecha y hora de ingreso en el historial de acceso. |
|🔗 Trazabilidad RF: | RF-03 Autenticación de usuarios, RF-04 Bloqueo por intentos fallidos. |
 
---
<br><br>
 
### CU03 – Gestionar Estudiantes desde Panel del Orientador
|  |  |
|:--|:--|
|ID | CU03 |
|Nombre | Gestionar Estudiantes desde Panel del Orientador |
|Actor(es) | Orientador escolar |
|Descripción | El orientador accede a su panel para visualizar la lista de estudiantes asignados, consultar su información y seleccionar estudiantes para acompañamiento. |
|Precondiciones | 1. El orientador posee una sesión activa con rol de orientador. <br><br>2. El orientador tiene al menos un estudiante asignado. |
|Flujo Normal | 1. El orientador ingresa al sistema y accede a 'Mi Panel'. <br><br>2. El sistema muestra la lista de estudiantes asignados con nombre, grado e indicadores de progreso. <br><br>3. El orientador consulta la información general. <br><br>4. El orientador selecciona un estudiante específico. <br><br>5. El sistema muestra el perfil detallado del estudiante seleccionado. <br><br>6. El orientador registra observaciones o inicia el proceso de acompañamiento. |
|Flujos Alternos / Excepciones | 2a. No existen estudiantes asignados → el sistema muestra la lista vacía con un mensaje orientativo sobre cómo vincular estudiantes. <br><br>6a. El orientador no registra ninguna observación → el sistema no genera ninguna acción adicional. |
|Postcondiciones | 1. El orientador accede a la información actualizada de sus estudiantes. <br><br>2. Se registra la fecha de la última consulta del perfil del estudiante. |
|🔗 Trazabilidad RF: | RF-05 Panel del orientador, RF-06 Consulta de perfil de estudiante. |
 
---
<br><br>
 
### CU04 – Validar Registro de Estudiante por Administrador
|  |  |
|:--|:--|
|ID | CU04 |
|Nombre | Validar Registro de Estudiante por Administrador |
|Actor(es) | Administrador |
|Descripción | El administrador revisa los registros pendientes para verificar que pertenecen a instituciones públicas de Medellín y aprueba o rechaza cada solicitud. |
|Precondiciones | 1. Existen cuentas de estudiantes en estado 'pendiente de validación'. <br><br>2. El administrador posee sesión activa con permisos de validación. |
|Flujo Normal | 1. El administrador accede a 'Registros pendientes'. <br><br>2. El sistema muestra la lista de solicitudes con fecha, institución y datos del estudiante. <br><br>3. El administrador selecciona una solicitud y revisa la información. <br><br>4. El administrador decide: acepta o rechaza la solicitud. <br><br>5. El sistema actualiza el estado de la cuenta. <br><br>6. El sistema envía una notificación automática al estudiante con el resultado y, en caso de rechazo, el motivo. |
|Flujos Alternos / Excepciones | 3a. La información está incompleta o es inconsistente → el administrador marca la solicitud como 'inconsistente' y registra las observaciones correspondientes. <br><br>3b. La institución no corresponde a una institución pública de Medellín → el administrador rechaza la solicitud con motivo específico. |
|Postcondiciones | 1. La cuenta queda en estado 'activa' o 'rechazada' según la decisión. <br><br>2. El estudiante es notificado por correo electrónico del resultado. <br><br>3. Queda registrada la acción del administrador con fecha y hora. |
|🔗 Trazabilidad RF: | RF-07 Validación de registros institucionales, RF-08 Notificación de estado de cuenta. |
 
---
<br><br>
 
### CU05 – Registrar Padre de Familia y Vincular a Estudiante
|  |  |
|:--|:--|
|ID | CU05 |
|Nombre | Registrar Padre de Familia y Vincular a Estudiante |
|Actor(es) | Padre de familia |
|Descripción | El padre de familia crea su cuenta en el sistema y la vincula al perfil de su hijo mediante un código único, para poder consultar los resultados vocacionales del estudiante. |
|Precondiciones | 1. El estudiante ya tiene una cuenta registrada y activa en el sistema. <br><br>2. El padre no tiene una cuenta previa en el sistema. |
|Flujo Normal | 1. El padre accede a la página de registro para acudientes. <br><br>2. El sistema muestra el formulario con campos personales y de vinculación. <br><br>3. El padre completa sus datos personales. <br><br>4. El padre ingresa el código único o enlace proporcionado por el estudiante. <br><br>5. El sistema valida el código y confirma la relación padre-estudiante. <br><br>6. El sistema crea la cuenta del padre vinculada al estudiante. <br><br>7. El sistema envía confirmación al padre y notifica al estudiante sobre la vinculación. |
|Flujos Alternos / Excepciones | 4a. El código ingresado no existe o ha expirado → el sistema muestra error y permite reingresar el código. <br><br>5a. El estudiante ya tiene un acudiente vinculado → el sistema advierte y solicita confirmación antes de continuar o redirige al soporte. |
|Postcondiciones | 1. La cuenta del padre queda creada y vinculada al estudiante. <br><br>2. El estudiante recibe notificación de la vinculación. |
|🔗 Trazabilidad RF: | RF-09 Registro de acudientes, RF-10 Vinculación padre-estudiante. |
 
---
<br><br>
 
### CU06 – Gestionar Permisos de Docentes y Orientadores
|  |  |
|:--|:--|
|ID | CU06 |
|Nombre | Gestionar Permisos de Docentes y Orientadores |
|Actor(es) | Administrador institucional |
|Descripción | El administrador institucional asigna, modifica o revoca roles y permisos a docentes y orientadores de su institución. |
|Precondiciones | 1. El administrador institucional posee sesión activa. <br><br>2. Existen docentes u orientadores registrados en la institución. |
|Flujo Normal | 1. El administrador accede al panel 'Gestión de permisos'. <br><br>2. El sistema muestra la lista de usuarios de la institución con sus roles actuales. <br><br>3. El administrador selecciona un usuario. <br><br>4. El administrador asigna, modifica o revoca el rol o los permisos correspondientes. <br><br>5. El sistema valida que los cambios sean coherentes con la política de roles. <br><br>6. El sistema guarda los cambios y envía notificación al usuario afectado. |
|Flujos Alternos / Excepciones | 2a. No existen docentes registrados en la institución → el sistema muestra lista vacía con opción de invitar o registrar nuevos usuarios. <br><br>5a. El rol seleccionado entra en conflicto con las políticas del sistema → el sistema muestra un aviso y bloquea el guardado hasta que se corrija. |
|Postcondiciones | 1. Los permisos del usuario quedan actualizados en el sistema. <br><br>2. El usuario afectado recibe notificación del cambio en su rol. |
|🔗 Trazabilidad RF: | RF-11 Gestión de roles, RF-12 Control de acceso por rol. |
 
---
<br><br>
 
## Módulo 2: Cuestionario y Evaluación
 
### CU07 – Responder Cuestionario Vocacional
|  |  |
|:--|:--|
|ID | CU07 |
|Nombre | Responder Cuestionario Vocacional |
|Actor(es) | Estudiante |
|Descripción | El estudiante responde el cuestionario de intereses, aptitudes y habilidades para obtener un perfil vocacional. |
|Precondiciones | 1. El estudiante posee sesión activa. <br><br>2. El cuestionario está disponible y publicado por la institución. <br><br>3. El estudiante no ha completado el cuestionario en el período actual. |
|Flujo Normal | 1. El estudiante accede a 'Cuestionario vocacional'. <br><br>2. El sistema muestra las instrucciones y el primer bloque de preguntas. <br><br>3. El estudiante responde cada sección de forma secuencial. <br><br>4. El sistema registra cada respuesta en tiempo real. <br><br>5. El estudiante finaliza el cuestionario y confirma el envío. <br><br>6. El sistema procesa las respuestas y genera el perfil vocacional. <br><br>7. El sistema muestra un mensaje de confirmación e indica que los resultados están disponibles. |
|Flujos Alternos / Excepciones | 3a. El estudiante intenta avanzar con preguntas sin responder → el sistema muestra alerta indicando las preguntas pendientes y bloquea el avance. <br><br>6a. Error en el procesamiento de resultados → el sistema notifica al estudiante y programa un reintento automático. |
|Postcondiciones | 1. Las respuestas quedan almacenadas en el historial del estudiante. <br><br>2. El perfil vocacional generado queda disponible para el estudiante, orientador y padre vinculado. |
|🔗 Trazabilidad RF: | RF-13 Cuestionario vocacional, RF-14 Generación de perfil vocacional. |
 
---
<br><br>
 
### CU08 – Guardar Progreso del Cuestionario
|  |  |
|:--|:--|
|ID | CU08 |
|Nombre | Guardar Progreso del Cuestionario |
|Actor(es) | Estudiante |
|Descripción | El estudiante interrumpe el cuestionario y guarda el progreso para continuar en una sesión posterior. |
|Precondiciones | 1. El estudiante tiene el cuestionario iniciado con al menos una respuesta registrada. <br><br>2. El estudiante posee sesión activa. |
|Flujo Normal | 1. El estudiante selecciona la opción 'Guardar y continuar después'. <br><br>2. El sistema almacena las respuestas parciales con marca de tiempo. <br><br>3. El sistema confirma el guardado y muestra el número de preguntas completadas. <br><br>4. El estudiante puede cerrar la sesión con seguridad. |
|Flujos Alternos / Excepciones | 2a. Error de conexión durante el guardado → el sistema muestra un mensaje de error y ofrece reintentar el guardado. <br><br>2b. La sesión ha expirado antes del guardado → el sistema recupera las respuestas de la sesión desde caché local e intenta guardarlas al reconectar. |
|Postcondiciones | 1. El progreso del cuestionario queda almacenado. <br><br>2. Al reingresar, el sistema retoma el cuestionario desde la última pregunta guardada. |
|🔗 Trazabilidad RF: | RF-15 Guardado de progreso, RF-16 Recuperación de sesión del cuestionario. |
 
---
<br><br>
 
### CU09 – Visualizar Resultados de Estudiante por Orientador
|  |  |
|:--|:--|
|ID | CU09 |
|Nombre | Visualizar Resultados de Estudiante por Orientador |
|Actor(es) | Orientador escolar |
|Descripción | El orientador consulta los resultados del cuestionario vocacional de sus estudiantes para apoyar los procesos de acompañamiento. |
|Precondiciones | 1. El orientador tiene sesión activa. <br><br>2. Al menos uno de sus estudiantes ha completado el cuestionario. |
|Flujo Normal | 1. El orientador accede al panel de estudiantes. <br><br>2. El sistema muestra la lista de estudiantes con indicador de estado del cuestionario. <br><br>3. El orientador selecciona un estudiante. <br><br>4. El sistema muestra los resultados del cuestionario: perfil vocacional, competencias destacadas y carreras sugeridas. |
|Flujos Alternos / Excepciones | 3a. El estudiante seleccionado no ha completado el cuestionario → el sistema muestra mensaje informativo y el porcentaje de avance actual. <br><br>4a. Error al cargar los resultados → el sistema notifica el error y ofrece reintentar. |
|Postcondiciones | 1. El orientador visualiza los resultados del estudiante. <br><br>2. Se registra la fecha de consulta del perfil. |
|🔗 Trazabilidad RF: | RF-17 Consulta de resultados por orientador, RF-06 Consulta de perfil de estudiante. |
 
---
<br><br>
 
### CU10 – Personalizar Preguntas del Cuestionario por Institución
|  |  |
|:--|:--|
|ID | CU10 |
|Nombre | Personalizar Preguntas del Cuestionario por Institución |
|Actor(es) | Administrador institucional |
|Descripción | El administrador institucional crea, edita o elimina preguntas del cuestionario para adaptarlo a las necesidades particulares de su institución. |
|Precondiciones | 1. El administrador institucional posee sesión activa con permisos de edición del cuestionario. <br><br>2. Existe al menos una versión base del cuestionario publicada. |
|Flujo Normal | 1. El administrador accede a 'Configuración del cuestionario'. <br><br>2. El sistema muestra la lista de preguntas actuales con su tipo y estado. <br><br>3. El administrador crea una nueva pregunta, modifica una existente o elimina una. <br><br>4. El sistema valida la estructura y tipo de respuesta de la pregunta. <br><br>5. El administrador guarda los cambios. <br><br>6. El sistema publica la nueva versión del cuestionario y registra la modificación. |
|Flujos Alternos / Excepciones | 4a. La pregunta no tiene el formato correcto o carece de opciones de respuesta → el sistema muestra el error específico y bloquea el guardado. <br><br>3a. El administrador intenta eliminar una pregunta que ya tiene respuestas registradas → el sistema advierte el impacto y solicita confirmación. |
|Postcondiciones | 1. El cuestionario queda actualizado con las nuevas preguntas. <br><br>2. Se registra la versión anterior para auditoría. |
|🔗 Trazabilidad RF: | RF-18 Personalización del cuestionario, RF-19 Versionado de cuestionarios. |
 
---
<br><br>
 
### CU11 – Consultar Competencias Destacadas de Estudiantes
|  |  |
|:--|:--|
|ID | CU11 |
|Nombre | Consultar Competencias Destacadas de Estudiantes |
|Actor(es) | Docente |
|Descripción | El docente revisa las competencias sobresalientes de sus estudiantes para apoyar la planificación pedagógica. |
|Precondiciones | 1. El docente tiene sesión activa. <br><br>2. Al menos un estudiante del grupo ha completado el cuestionario y tiene resultados disponibles. |
|Flujo Normal | 1. El docente accede al panel del grupo. <br><br>2. El sistema muestra la lista de estudiantes con indicadores de competencias. <br><br>3. El docente selecciona un estudiante. <br><br>4. El sistema muestra las competencias destacadas del estudiante con nivel de desempeño. |
|Flujos Alternos / Excepciones | 2a. Ningún estudiante del grupo ha completado el cuestionario → el sistema muestra mensaje informativo. <br><br>4a. Error al cargar el detalle → el sistema muestra mensaje de error y opción de reintento. |
|Postcondiciones | 1. El docente obtiene información detallada sobre las competencias del estudiante. <br><br>2. Se registra la consulta para estadísticas de uso. |
|🔗 Trazabilidad RF: | RF-20 Consulta de competencias por docente, RF-17 Consulta de resultados. |
 
---
<br><br>
 
### CU12 – Recibir Retroalimentación del Cuestionario
|  |  |
|:--|:--|
|ID | CU12 |
|Nombre | Recibir Retroalimentación del Cuestionario |
|Actor(es) | Estudiante |
|Descripción | El estudiante visualiza la retroalimentación generada por el sistema sobre sus fortalezas, áreas de mejora y orientación vocacional al finalizar el cuestionario. |
|Precondiciones | 1. El estudiante ha completado el cuestionario vocacional. <br><br>2. El sistema ha procesado correctamente las respuestas. |
|Flujo Normal | 1. El estudiante accede a 'Mis resultados' o es redirigido automáticamente tras finalizar. <br><br>2. El sistema muestra el resumen de retroalimentación: fortalezas, áreas de mejora y recomendaciones. <br><br>3. El estudiante puede navegar entre las secciones de la retroalimentación. <br><br>4. El sistema ofrece la opción de guardar o compartir la retroalimentación. |
|Flujos Alternos / Excepciones | 2a. Error en la generación de retroalimentación → el sistema notifica al estudiante y programa reintento automático en segundo plano. <br><br>2b. La retroalimentación aún está siendo procesada → el sistema muestra un indicador de carga y actualiza automáticamente. |
|Postcondiciones | 1. La retroalimentación queda disponible en el perfil del estudiante. <br><br>2. El orientador vinculado recibe notificación de que el estudiante completó el cuestionario. |
|🔗 Trazabilidad RF: | RF-21 Retroalimentación vocacional, RF-14 Generación de perfil. |
 
---
<br><br>
 
## Módulo 3: Resultados y Perfil Vocacional
 
### CU13 – Visualizar Resumen Gráfico de Resultados
|  |  |
|:--|:--|
|ID | CU13 |
|Nombre | Visualizar Resumen Gráfico de Resultados |
|Actor(es) | Estudiante |
|Descripción | El estudiante consulta representaciones gráficas interactivas de sus afinidades académicas y resultados del cuestionario vocacional. |
|Precondiciones | 1. El estudiante tiene sesión activa. <br><br>2. El perfil vocacional ha sido generado. |
|Flujo Normal | 1. El estudiante accede a 'Mis resultados'. <br><br>2. El sistema muestra gráficos interactivos de afinidades por área académica. <br><br>3. El estudiante interactúa con los gráficos para explorar detalles por categoría. <br><br>4. El sistema muestra información adicional según la selección del estudiante. |
|Flujos Alternos / Excepciones | 2a. El cuestionario aún no ha sido completado → el sistema muestra aviso y enlace para iniciar el cuestionario. <br><br>2b. Error al cargar los gráficos → el sistema muestra tabla de datos como alternativa. |
|Postcondiciones | 1. Los resultados gráficos son mostrados al estudiante. <br><br>2. Se registra la consulta para métricas de uso. |
|🔗 Trazabilidad RF: | RF-22 Visualización gráfica de resultados, RF-14 Generación de perfil. |
 
---
<br><br>
 
### CU14 – Consultar Descripción de Carreras Sugeridas
|  |  |
|:--|:--|
|ID | CU14 |
|Nombre | Consultar Descripción de Carreras Sugeridas |
|Actor(es) | Estudiante |
|Descripción | El estudiante accede a información detallada de las carreras sugeridas según su perfil vocacional. |
|Precondiciones | 1. El estudiante tiene sesión activa. <br><br>2. El sistema ha generado sugerencias de carreras basadas en el perfil vocacional. |
|Flujo Normal | 1. El estudiante accede a 'Carreras sugeridas'. <br><br>2. El sistema muestra la lista de carreras con indicador de afinidad. <br><br>3. El estudiante selecciona una carrera. <br><br>4. El sistema muestra la descripción detallada: perfil del profesional, duración, instituciones disponibles y campo laboral. |
|Flujos Alternos / Excepciones | 2a. No se han generado sugerencias → el sistema indica que debe completar el cuestionario. <br><br>4a. Error al cargar el detalle de la carrera → el sistema muestra mensaje de error y permite seleccionar otra. |
|Postcondiciones | 1. El estudiante consulta el detalle de la carrera de interés. <br><br>2. Se registra la carrera consultada para análisis de tendencias. |
|🔗 Trazabilidad RF: | RF-23 Catálogo de carreras, RF-14 Perfil vocacional. |
 
---
<br><br>
 
### CU15 – Consultar Resultados Vocacionales del Hijo
|  |  |
|:--|:--|
|ID | CU15 |
|Nombre | Consultar Resultados Vocacionales del Hijo |
|Actor(es) | Padre de familia |
|Descripción | El padre de familia visualiza los resultados vocacionales del estudiante al que está vinculado. |
|Precondiciones | 1. El padre tiene sesión activa y está vinculado a un estudiante. <br><br>2. El estudiante vinculado ha completado el cuestionario vocacional. |
|Flujo Normal | 1. El padre accede a 'Perfil de mi hijo'. <br><br>2. El sistema muestra el resumen del perfil vocacional del estudiante. <br><br>3. El padre navega por las secciones: competencias, carreras sugeridas y gráficos. <br><br>4. El sistema muestra el detalle de la sección seleccionada. |
|Flujos Alternos / Excepciones | 2a. El estudiante vinculado no ha completado el cuestionario → el sistema muestra el porcentaje de avance e indica la fecha estimada de resultados. <br><br>2b. El estudiante ha restringido el acceso a sus resultados → el sistema muestra mensaje de privacidad. |
|Postcondiciones | 1. El padre visualiza los resultados de su hijo. <br><br>2. Se registra la consulta para estadísticas. |
|🔗 Trazabilidad RF: | RF-16 Acceso de acudientes a resultados, RF-10 Vinculación padre-estudiante. |
 
---
<br><br>
 
### CU16 – Comparar Resultados Vocacionales por Grupo
|  |  |
|:--|:--|
|ID | CU16 |
|Nombre | Comparar Resultados Vocacionales por Grupo |
|Actor(es) | Docente |
|Descripción | El docente visualiza y analiza una comparación de las afinidades vocacionales de los estudiantes de su grupo para identificar tendencias colectivas. |
|Precondiciones | 1. El docente tiene sesión activa. <br><br>2. Al menos dos estudiantes del grupo han completado el cuestionario. |
|Flujo Normal | 1. El docente accede al panel del grupo. <br><br>2. El sistema muestra el resumen grupal de afinidades vocacionales. <br><br>3. El docente selecciona el tipo de comparación: por área, competencia o carrera sugerida. <br><br>4. El sistema actualiza los gráficos comparativos según la selección. <br><br>5. El docente identifica tendencias e imprime o exporta el resumen. |
|Flujos Alternos / Excepciones | 2a. Menos de dos estudiantes han completado el cuestionario → el sistema indica el número de estudiantes con resultados disponibles. <br><br>5a. Error al exportar → el sistema notifica y ofrece reintentar. |
|Postcondiciones | 1. El docente visualiza los datos comparativos del grupo. <br><br>2. Se registra la consulta para estadísticas de uso. |
|🔗 Trazabilidad RF: | RF-26 Comparación grupal de resultados, RF-20 Consulta por docente. |
 
---
<br><br>
 
### CU17 – Consultar Historial de Resultados Vocacionales
|  |  |
|:--|:--|
|ID | CU17 |
|Nombre | Consultar Historial de Resultados Vocacionales |
|Actor(es) | Estudiante |
|Descripción | El estudiante accede al historial de resultados de cuestionarios anteriores para comparar su evolución vocacional. |
|Precondiciones | 1. El estudiante tiene sesión activa. <br><br>2. El estudiante ha realizado el cuestionario en al menos una ocasión. |
|Flujo Normal | 1. El estudiante accede a 'Historial de resultados'. <br><br>2. El sistema muestra la lista de cuestionarios realizados con fecha y versión. <br><br>3. El estudiante selecciona dos períodos para comparar. <br><br>4. El sistema muestra la comparación de perfiles vocacionales entre los períodos seleccionados. <br><br>5. El estudiante puede iniciar un nuevo cuestionario para actualizar sus resultados. |
|Flujos Alternos / Excepciones | 2a. Solo existe un cuestionario realizado → el sistema muestra ese único resultado e informa que se requieren al menos dos para comparar. <br><br>4a. Error al cargar el historial → el sistema notifica y ofrece reintentar. |
|Postcondiciones | 1. El historial de resultados está disponible para el estudiante. <br><br>2. Si el estudiante inicia un nuevo cuestionario, se crea una nueva entrada en el historial. |
|🔗 Trazabilidad RF: | RF-27 Historial de resultados, RF-13 Cuestionario vocacional. |
 
---
<br><br>
 
## Módulo 4: Tendencias del Mercado Laboral
 
### CU18 – Consultar Carreras más Demandadas en el Mercado
|  |  |
|:--|:--|
|ID | CU18 |
|Nombre | Consultar Carreras más Demandadas en el Mercado |
|Actor(es) | Estudiante |
|Descripción | El estudiante accede al módulo de tendencias laborales para conocer las carreras con mayor demanda en Medellín. |
|Precondiciones | 1. El estudiante tiene sesión activa. <br><br>2. El módulo de tendencias tiene datos cargados. |
|Flujo Normal | 1. El estudiante accede a 'Tendencias del mercado laboral'. <br><br>2. El sistema muestra la lista de carreras más demandadas con indicadores de crecimiento. <br><br>3. El estudiante selecciona una carrera para obtener más información. <br><br>4. El sistema muestra el detalle: demanda actual, proyección y salario promedio. |
|Flujos Alternos / Excepciones | 2a. El sistema no encuentra datos actualizados → muestra los últimos datos disponibles con fecha de última actualización e indica que los datos podrían no estar al día. <br><br>2b. No hay datos disponibles → el sistema muestra mensaje informativo y sugiere consultar al orientador. |
|Postcondiciones | 1. El estudiante consulta las tendencias laborales. <br><br>2. Se registra la consulta para estadísticas de uso del módulo. |
|🔗 Trazabilidad RF: | RF-28 Módulo de tendencias laborales, RF-29 Catálogo de carreras demandadas. |
 
---
<br><br>
 
### CU19 – Consultar Estadísticas Laborales Locales
|  |  |
|:--|:--|
|ID | CU19 |
|Nombre | Consultar Estadísticas Laborales Locales |
|Actor(es) | Orientador escolar |
|Descripción | El orientador accede a estadísticas laborales actualizadas de Medellín para utilizarlas como insumo en sus sesiones de orientación. |
|Precondiciones | 1. El orientador tiene cuenta activa con permisos de orientador. <br><br>2. El módulo de estadísticas laborales está disponible. |
|Flujo Normal | 1. El orientador accede a 'Tendencias laborales'. <br><br>2. El sistema muestra el panel con gráficos de empleo local por sector. <br><br>3. El orientador selecciona 'Estadísticas locales'. <br><br>4. El sistema actualiza los gráficos con datos locales de Medellín. <br><br>5. El orientador explora los datos por período, sector o nivel de formación. |
|Flujos Alternos / Excepciones | 4a. El sistema detecta que los datos están incompletos → muestra los indicadores disponibles con advertencia de datos parciales. <br><br>4b. Error al cargar estadísticas → el sistema notifica y ofrece reintentar. |
|Postcondiciones | 1. El orientador accede a las estadísticas laborales. <br><br>2. Se registra la visualización para métricas de uso. |
|🔗 Trazabilidad RF: | RF-28 Tendencias laborales, RF-30 Estadísticas locales de empleo. |
 
---
<br><br>
 
### CU20 – Visualizar Tendencias Laborales por Sector
|  |  |
|:--|:--|
|ID | CU20 |
|Nombre | Visualizar Tendencias Laborales por Sector |
|Actor(es) | Docente |
|Descripción | El docente consulta la empleabilidad y proyección laboral por sector económico para enriquecer sus clases y orientación. |
|Precondiciones | 1. El docente tiene sesión activa. <br><br>2. El módulo de tendencias está disponible con al menos un sector cargado. |
|Flujo Normal | 1. El docente accede al módulo de tendencias. <br><br>2. El sistema muestra la lista de sectores económicos disponibles. <br><br>3. El docente selecciona un sector específico. <br><br>4. El sistema muestra las tendencias del sector: empleabilidad, crecimiento y carreras asociadas. <br><br>5. El docente puede descargar los datos o compartirlos. |
|Flujos Alternos / Excepciones | 3a. No hay datos para el sector seleccionado → el sistema muestra mensaje e indica sectores con información disponible. <br><br>4a. Error al cargar el sector → el sistema notifica y ofrece reintentar o seleccionar otro sector. |
|Postcondiciones | 1. El docente visualiza las tendencias del sector seleccionado. <br><br>2. Se registra el sector consultado para estadísticas. |
|🔗 Trazabilidad RF: | RF-28 Tendencias laborales, RF-31 Consulta por sector económico. |
 
---
<br><br>
 
### CU21 – Consultar Oportunidades Laborales de Carreras Sugeridas
|  |  |
|:--|:--|
|ID | CU21 |
|Nombre | Consultar Oportunidades Laborales de Carreras Sugeridas |
|Actor(es) | Padre de familia |
|Descripción | El padre de familia consulta la empleabilidad y demanda laboral de las carreras sugeridas para su hijo. |
|Precondiciones | 1. El padre tiene sesión activa y está vinculado a un estudiante. <br><br>2. El estudiante tiene carreras sugeridas en su perfil vocacional. |
|Flujo Normal | 1. El padre accede al perfil vocacional del estudiante. <br><br>2. El sistema muestra las carreras sugeridas con indicador de empleabilidad. <br><br>3. El padre selecciona una carrera. <br><br>4. El sistema muestra las oportunidades laborales: empleadores relevantes, rangos salariales y perspectivas de crecimiento. |
|Flujos Alternos / Excepciones | 4a. Los datos laborales para esa carrera están incompletos → el sistema muestra la información disponible con advertencia de datos parciales. <br><br>4b. Error al cargar oportunidades → el sistema notifica y ofrece reintentar. |
|Postcondiciones | 1. El padre obtiene información laboral sobre las carreras sugeridas a su hijo. <br><br>2. Se registra la consulta para estadísticas. |
|🔗 Trazabilidad RF: | RF-22 Oportunidades laborales por carrera, RF-16 Acceso de acudientes. |
 
---
<br><br>
 
### CU22 – Actualizar Datos del Mercado Laboral
|  |  |
|:--|:--|
|ID | CU22 |
|Nombre | Actualizar Datos del Mercado Laboral |
|Actor(es) | Administrador de la aplicación |
|Descripción | El administrador carga o actualiza manualmente los datos del mercado laboral para mantener vigente el módulo de tendencias. |
|Precondiciones | 1. El administrador tiene sesión activa con permisos de administración. <br><br>2. Existen datos nuevos del mercado laboral para cargar. |
|Flujo Normal | 1. El administrador accede al panel de administración de datos. <br><br>2. El sistema muestra las opciones: carga manual, importación de archivo o integración con fuente externa. <br><br>3. El administrador selecciona el tipo de actualización y carga la información. <br><br>4. El sistema valida la estructura y consistencia de los datos. <br><br>5. El administrador confirma la actualización. <br><br>6. El sistema almacena los datos y actualiza la fecha de última actualización del módulo. |
|Flujos Alternos / Excepciones | 4a. Los datos tienen formato inválido o están incompletos → el sistema muestra los errores específicos por campo y bloquea la carga hasta corrección. <br><br>6a. Error al almacenar → el sistema registra el incidente y mantiene los datos anteriores sin afectar al usuario final. |
|Postcondiciones | 1. Los datos del mercado laboral quedan actualizados en el módulo. <br><br>2. Se registra la actualización con fecha, hora y usuario responsable. |
|🔗 Trazabilidad RF: | RF-32 Gestión de datos laborales, RF-33 Importación de fuentes externas. |
 
---
<br><br>
 
### CU23 – Consultar Carreras con Menor Riesgo de Automatización
|  |  |
|:--|:--|
|ID | CU23 |
|Nombre | Consultar Carreras con Menor Riesgo de Automatización |
|Actor(es) | Estudiante |
|Descripción | El estudiante revisa un ranking de carreras menos propensas a ser reemplazadas por inteligencia artificial o automatización. |
|Precondiciones | 1. El estudiante tiene sesión activa. <br><br>2. El módulo contiene el ranking de riesgo de automatización. |
|Flujo Normal | 1. El estudiante accede al módulo de tendencias. <br><br>2. El estudiante selecciona 'Carreras y riesgo de automatización'. <br><br>3. El sistema muestra un ranking ordenado de menor a mayor riesgo con descripción del índice. <br><br>4. El estudiante selecciona una carrera para ver el detalle del análisis. <br><br>5. El sistema muestra el análisis de riesgo: tareas susceptibles, tareas creativas o relacionales y proyección. |
|Flujos Alternos / Excepciones | 3a. Los datos están desactualizados → el sistema muestra aviso con la fecha de la última actualización y los datos disponibles. <br><br>3b. Error al cargar el ranking → el sistema notifica y ofrece reintentar. |
|Postcondiciones | 1. El estudiante consulta el ranking de riesgo de automatización. <br><br>2. Se registra la consulta para estadísticas. |
|🔗 Trazabilidad RF: | RF-34 Ranking de riesgo de automatización, RF-28 Módulo de tendencias. |
 
---
<br><br>
 
## Módulo 5: Administración, Monitoreo y Gestión de Contenido
 
### CU24 – Visualizar Estadísticas Generales de la Aplicación
|  |  |
|:--|:--|
|ID | CU24 |
|Nombre | Visualizar Estadísticas Generales de la Aplicación |
|Actor(es) | Administrador de la aplicación |
|Descripción | El administrador accede a un panel de métricas globales sobre el uso, participación y rendimiento de la aplicación. |
|Precondiciones | 1. El administrador tiene sesión activa. <br><br>2. El sistema ha acumulado datos suficientes para generar métricas. |
|Flujo Normal | 1. El administrador accede a 'Panel de estadísticas'. <br><br>2. El sistema muestra gráficos sobre: usuarios activos, cuestionarios completados, distribución institucional y uso por módulo. <br><br>3. El administrador filtra por período, institución o módulo. <br><br>4. El sistema actualiza los gráficos según el filtro aplicado. |
|Flujos Alternos / Excepciones | 2a. El sistema no puede generar todas las métricas → muestra las disponibles con indicación de cuáles están pendientes. <br><br>4a. Error al aplicar filtro → el sistema notifica y muestra las métricas sin filtro. |
|Postcondiciones | 1. El administrador visualiza las estadísticas del sistema. <br><br>2. Se registra la consulta de métricas para auditoría. |
|🔗 Trazabilidad RF: | RF-35 Panel de administración, RF-36 Estadísticas globales. |
 
---
<br><br>
 
### CU25 – Exportar Resultados por Grupos de Estudiantes
|  |  |
|:--|:--|
|ID | CU25 |
|Nombre | Exportar Resultados por Grupos de Estudiantes |
|Actor(es) | Orientador escolar |
|Descripción | El orientador exporta un reporte consolidado con los resultados vocacionales de un grupo de estudiantes. |
|Precondiciones | 1. El orientador tiene sesión activa y tiene estudiantes vinculados. <br><br>2. Al menos un estudiante del grupo tiene resultados disponibles. |
|Flujo Normal | 1. El orientador accede a 'Reportes'. <br><br>2. El sistema muestra los grupos disponibles con número de estudiantes y completitud del cuestionario. <br><br>3. El orientador selecciona un grupo y el formato de exportación (PDF o CSV). <br><br>4. El sistema genera el archivo con los resultados del grupo. <br><br>5. El sistema notifica la disponibilidad del archivo. <br><br>6. El orientador descarga el archivo. |
|Flujos Alternos / Excepciones | 4a. Ningún estudiante del grupo tiene resultados → el sistema informa y no permite la exportación. <br><br>4b. Error en la exportación → el sistema notifica y ofrece reintentar. |
|Postcondiciones | 1. El archivo es generado y descargado por el orientador. <br><br>2. Se registra la exportación con fecha, usuario y grupo seleccionado. |
|🔗 Trazabilidad RF: | RF-38 Exportación grupal, RF-25 Descarga de archivos. |
 
---
<br><br>
 
### CU26 – Configurar Permisos por Rol
|  |  |
|:--|:--|
|ID | CU26 |
|Nombre | Configurar Permisos por Rol |
|Actor(es) | Administrador de la aplicación |
|Descripción | El administrador configura los permisos de acceso a módulos y funcionalidades para cada rol del sistema. |
|Precondiciones | 1. El administrador tiene permisos de superadministración. <br><br>2. Existen roles definidos en el sistema. |
|Flujo Normal | 1. El administrador accede a 'Gestión de roles'. <br><br>2. El sistema muestra la lista de roles con sus permisos actuales. <br><br>3. El administrador selecciona un rol. <br><br>4. El administrador edita los permisos de acceso. <br><br>5. El sistema valida la coherencia de los permisos (sin conflictos ni vacíos de seguridad). <br><br>6. El sistema guarda los cambios y notifica a los usuarios afectados. |
|Flujos Alternos / Excepciones | 5a. Los permisos configurados son inválidos o generan conflictos → el sistema muestra advertencia y bloquea el guardado hasta corrección. <br><br>5b. Se intenta eliminar un permiso crítico del sistema → el sistema impide la acción y explica la restricción. |
|Postcondiciones | 1. Los permisos del rol quedan actualizados. <br><br>2. Los usuarios con ese rol reflejan los nuevos permisos en su próxima sesión. |
|🔗 Trazabilidad RF: | RF-12 Control de acceso, RF-39 Gestión de superadministración. |
 
---
<br><br>
 
### CU27 – Recibir Notificaciones Institucionales
|  |  |
|:--|:--|
|ID | CU27 |
|Nombre | Recibir Notificaciones Institucionales |
|Actor(es) | Administrador institucional |
|Descripción | El administrador institucional recibe y gestiona notificaciones automáticas sobre actividades relevantes de su institución. |
|Precondiciones | 1. El administrador institucional tiene sesión activa y las notificaciones activadas. <br><br>2. Se ha producido un evento relevante en el sistema. |
|Flujo Normal | 1. El sistema detecta una acción relevante (nuevo registro, encuesta completada, validación pendiente). <br><br>2. El sistema genera y envía la notificación al administrador. <br><br>3. El administrador visualiza la notificación en el panel o por correo. <br><br>4. El administrador marca la notificación como leída o toma acción. |
|Flujos Alternos / Excepciones | 2a. Fallo en el envío de la notificación → el sistema la registra en cola de reenvío automático. <br><br>3a. El administrador no tiene sesión activa → la notificación queda pendiente y se muestra al iniciar sesión. |
|Postcondiciones | 1. La notificación queda marcada como leída o atendida. <br><br>2. Se registra el historial de notificaciones para auditoría. |
|🔗 Trazabilidad RF: | RF-42 Sistema de notificaciones, RF-43 Registro de eventos institucionales. |
 
---
<br><br>
 
## Módulo 6: Creación y Gestión de Encuestas
 
### CU28 – Crear y Publicar Encuesta
|  |  |
|:--|:--|
|ID | CU28 |
|Nombre | Crear y Publicar Encuesta |
|Actor(es) | Administrador de la aplicación |
|Descripción | El administrador diseña una encuesta personalizada con preguntas estructuradas y la publica para ser aplicada por los orientadores. |
|Precondiciones | 1. El administrador tiene sesión activa con acceso al módulo de encuestas. <br><br>2. Existe al menos un orientador registrado en el sistema. |
|Flujo Normal | 1. El administrador accede a 'Gestión de encuestas' y selecciona 'Crear encuesta'. <br><br>2. El sistema muestra el editor de encuestas con los tipos de pregunta disponibles. <br><br>3. El administrador define el título, descripción y período de vigencia. <br><br>4. El administrador diseña las preguntas. <br><br>5. El sistema valida la estructura de la encuesta. <br><br>6. El administrador publica la encuesta. <br><br>7. El sistema confirma la publicación y habilita la encuesta para asignación. |
|Flujos Alternos / Excepciones | 5a. La encuesta tiene preguntas con formato inválido o sin opciones de respuesta → el sistema marca los errores específicos y bloquea la publicación. <br><br>5b. La encuesta no tiene preguntas → el sistema bloquea la publicación con mensaje explicativo. |
|Postcondiciones | 1. La encuesta queda publicada y disponible para asignación. <br><br>2. Se registra la creación con fecha y usuario autor. |
|🔗 Trazabilidad RF: | RF-44 Creación de encuestas, RF-45 Publicación de encuestas. |
 
---
<br><br>
 
### CU29 – Editar o Eliminar Encuesta
|  |  |
|:--|:--|
|ID | CU29 |
|Nombre | Editar o Eliminar Encuesta |
|Actor(es) | Administrador institucional |
|Descripción | El administrador institucional modifica el contenido de una encuesta o la elimina, respetando las restricciones del sistema. |
|Precondiciones | 1. El administrador institucional tiene sesión activa. <br><br>2. Existe al menos una encuesta creada en el sistema. |
|Flujo Normal | 1. El administrador accede a 'Gestión de encuestas'. <br><br>2. El sistema muestra la lista de encuestas con estado: borrador, activa, cerrada. <br><br>3. El administrador selecciona una encuesta. <br><br>4. El administrador elige 'Editar' o 'Eliminar'. <br><br>5. El sistema valida que la operación sea permitida. <br><br>6. El sistema aplica los cambios y confirma la operación. |
|Flujos Alternos / Excepciones | 5a. La encuesta está siendo respondida activamente → el sistema impide la eliminación y sugiere cerrarla primero. <br><br>5b. La encuesta tiene respuestas registradas → al editar, el sistema advierte que los cambios podrían afectar la coherencia de los datos. <br><br>6a. Error al guardar cambios → el sistema notifica y no aplica la modificación. |
|Postcondiciones | 1. La encuesta queda actualizada o eliminada del sistema. <br><br>2. Las respuestas previas se conservan en el historial si la encuesta fue eliminada. |
|🔗 Trazabilidad RF: | RF-46 Edición de encuestas, RF-47 Eliminación controlada. |
 
---
<br><br>
 
### CU30 – Visualizar Estadísticas de Encuestas
|  |  |
|:--|:--|
|ID | CU30 |
|Nombre | Visualizar Estadísticas de Encuestas |
|Actor(es) | Administrador de la aplicación |
|Descripción | El administrador visualiza los resultados agregados de las encuestas para analizar tendencias y tomar decisiones. |
|Precondiciones | 1. El administrador tiene sesión activa. <br><br>2. Al menos una encuesta tiene respuestas registradas. |
|Flujo Normal | 1. El administrador accede a 'Estadísticas de encuestas'. <br><br>2. El administrador selecciona una encuesta específica o el resumen global. <br><br>3. El sistema muestra gráficos agregados: distribución de respuestas, tasa de participación y comparaciones por institución. <br><br>4. El administrador puede filtrar por período, institución o perfil de respondente. <br><br>5. El sistema actualiza las gráficas según el filtro. |
|Flujos Alternos / Excepciones | 3a. La encuesta seleccionada no tiene respuestas → el sistema muestra aviso y tasa de respuesta en 0%. <br><br>5a. Error al aplicar filtro → el sistema notifica y muestra estadísticas sin filtro. |
|Postcondiciones | 1. El administrador visualiza las métricas de la encuesta. <br><br>2. Se registra la consulta para auditoría. |
|🔗 Trazabilidad RF: | RF-48 Estadísticas de encuestas, RF-36 Métricas globales. |
 
---
<br><br>
 
### CU31 – Compartir Encuesta con Orientadores
|  |  |
|:--|:--|
|ID | CU31 |
|Nombre | Compartir Encuesta con Orientadores |
|Actor(es) | Administrador de la aplicación |
|Descripción | El administrador asigna una encuesta publicada a orientadores específicos para su aplicación en grupos de estudiantes. |
|Precondiciones | 1. El administrador tiene sesión activa. <br><br>2. La encuesta está publicada. <br><br>3. Existen orientadores registrados en el sistema. |
|Flujo Normal | 1. El administrador accede a la encuesta publicada. <br><br>2. El sistema muestra la opción 'Asignar orientadores'. <br><br>3. El administrador selecciona uno o varios orientadores de la lista. <br><br>4. El sistema valida que los orientadores tienen los permisos necesarios. <br><br>5. El sistema envía el acceso a la encuesta a los orientadores seleccionados. <br><br>6. El sistema confirma el envío y registra la asignación. |
|Flujos Alternos / Excepciones | 4a. Uno o más orientadores no tienen los permisos suficientes → el sistema advierte y excluye a esos orientadores del envío. <br><br>5a. Error al enviar el acceso → el sistema registra el fallo y reintenta automáticamente. |
|Postcondiciones | 1. Los orientadores seleccionados tienen acceso a la encuesta. <br><br>2. Se registra la asignación con fecha y orientadores involucrados. |
|🔗 Trazabilidad RF: | RF-45 Publicación de encuestas, RF-49 Asignación a orientadores. |
 
---
<br><br>
 
### CU32 – Responder Encuesta Institucional
|  |  |
|:--|:--|
|ID | CU32 |
|Nombre | Responder Encuesta Institucional |
|Actor(es) | Orientador escolar |
|Descripción | El orientador responde una encuesta institucional asignada sobre los procesos vocacionales de su institución. |
|Precondiciones | 1. El orientador tiene sesión activa. <br><br>2. Existe al menos una encuesta asignada al orientador en estado activo. |
|Flujo Normal | 1. El orientador accede a 'Mis encuestas'. <br><br>2. El sistema muestra la lista de encuestas asignadas con estado y fecha límite. <br><br>3. El orientador selecciona una encuesta. <br><br>4. El orientador responde las preguntas. <br><br>5. El orientador envía las respuestas. <br><br>6. El sistema valida que todas las preguntas obligatorias estén respondidas. <br><br>7. El sistema registra las respuestas y confirma el envío. |
|Flujos Alternos / Excepciones | 6a. Quedan preguntas obligatorias sin responder → el sistema las resalta y bloquea el envío. <br><br>5a. La encuesta ha sido cerrada antes del envío → el sistema bloquea el envío y notifica al orientador. |
|Postcondiciones | 1. Las respuestas del orientador quedan registradas. <br><br>2. La encuesta se marca como completada para ese orientador. |
|🔗 Trazabilidad RF: | RF-50 Respuesta de encuestas, RF-44 Gestión de encuestas. |
 
---
<br><br>
 
## Módulo 7: Comunicación y Retroalimentación
 
### CU33 – Enviar Comentarios o Sugerencias sobre la Aplicación
|  |  |
|:--|:--|
|ID | CU33 |
|Nombre | Enviar Comentarios o Sugerencias sobre la Aplicación |
|Actor(es) | Estudiante |
|Descripción | El estudiante envía retroalimentación sobre su experiencia con la aplicación para contribuir a su mejora. |
|Precondiciones | 1. El estudiante tiene sesión activa. <br><br>2. El módulo de comentarios está habilitado. |
|Flujo Normal | 1. El estudiante accede a 'Comentarios y sugerencias'. <br><br>2. El sistema muestra el formulario de retroalimentación con categoría y campo de texto. <br><br>3. El estudiante selecciona la categoría y escribe su sugerencia o comentario. <br><br>4. El estudiante envía el formulario. <br><br>5. El sistema registra el feedback y envía confirmación al estudiante. <br><br>6. El sistema notifica al administrador de la nueva retroalimentación. |
|Flujos Alternos / Excepciones | 3a. El campo de comentario está vacío → el sistema advierte y bloquea el envío. <br><br>5a. Error al registrar el feedback → el sistema notifica e invita a reintentar. |
|Postcondiciones | 1. El feedback queda almacenado en el sistema. <br><br>2. El administrador es notificado del nuevo comentario. |
|🔗 Trazabilidad RF: | RF-51 Sistema de retroalimentación, RF-52 Notificaciones al administrador. |
 
---
<br><br>
 
### CU34 – Enviar Mensaje a Estudiante
|  |  |
|:--|:--|
|ID | CU34 |
|Nombre | Enviar Mensaje a Estudiante |
|Actor(es) | Orientador escolar |
|Descripción | El orientador envía un mensaje interno a un estudiante asignado a través de la plataforma. |
|Precondiciones | 1. El orientador tiene sesión activa. <br><br>2. El orientador tiene al menos un estudiante asignado con cuenta activa. |
|Flujo Normal | 1. El orientador accede a 'Mensajes'. <br><br>2. El sistema muestra la lista de estudiantes asignados. <br><br>3. El orientador selecciona un estudiante. <br><br>4. El orientador escribe y envía el mensaje. <br><br>5. El sistema registra el mensaje y lo entrega al estudiante. <br><br>6. El sistema notifica al estudiante sobre el nuevo mensaje. |
|Flujos Alternos / Excepciones | 5a. La cuenta del estudiante está inactiva → el sistema notifica al orientador y mantiene el mensaje en cola para entrega al reactivar la cuenta. <br><br>5b. Error en el envío → el sistema notifica al orientador y ofrece reintentar. |
|Postcondiciones | 1. El mensaje queda registrado en el historial de comunicaciones. <br><br>2. El estudiante recibe la notificación del nuevo mensaje. |
|🔗 Trazabilidad RF: | RF-53 Mensajería interna, RF-54 Notificaciones a estudiantes. |