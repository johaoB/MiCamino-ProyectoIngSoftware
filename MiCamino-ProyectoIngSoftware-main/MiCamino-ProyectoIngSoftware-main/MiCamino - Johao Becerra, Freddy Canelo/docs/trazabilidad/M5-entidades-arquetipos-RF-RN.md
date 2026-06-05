# MATRICES DE TRAZABILIDAD
**Proyecto: Mi Camino — Orientación Vocacional**

## 9.5 Matriz de Trazabilidad: Entidades → Arquetipos → RF → Reglas de Negocio

| Entidad | Arquetipo | RF | Regla de Negocio |
|---|---|---|---|
| ROL | Sujeto / Administrador | RF-006 | RN-01: El sistema reconoce exactamente 5 roles válidos: Estudiante, Orientador, Padre de Familia, Docente y Administrador. No se permite crear usuarios sin un rol asignado. |
| USUARIO | Sujeto / Estudiante, Orientador, Padre, Administrador | RF-001, RF-002 | RN-02: Cada usuario debe tener un correo electrónico único en el sistema. No se permiten registros duplicados con el mismo correo. |
| USUARIO | Sujeto / Administrador | RF-005 | RN-03: Un usuario solo puede activar su cuenta si pertenece a una institución educativa pública de Medellín validada por el administrador. |
| USUARIO | Sujeto / Estudiante | RF-002 | RN-04: Después de 5 intentos fallidos de inicio de sesión, la cuenta queda bloqueada temporalmente por 15 minutos. |
| INSTITUCION | Sujeto / Administrador | RF-005 | RN-05: Solo se aceptan instituciones con municipio igual a 'Medellín' y tipo 'pública'. Las instituciones privadas o de otros municipios no son elegibles. |
| ESTUDIANTE | Sujeto / Estudiante | RF-003 | RN-06: El perfil del estudiante debe incluir grado académico (10° u 11°) y nombre de la institución. No se puede completar el cuestionario sin estos datos. |
| ESTUDIANTE | Vínculo | RF-001 | RN-07: Un estudiante puede estar vinculado a máximo un padre o acudiente activo a la vez. |
| CUESTIONARIO | Evaluación | RF-007, RF-011 | RN-08: El cuestionario debe tener al menos 10 preguntas activas para poder ser presentado a un estudiante. |
| CUESTIONARIO | Evaluación | RF-008 | RN-09: El progreso del cuestionario se guarda automáticamente al responder cada pregunta. El estudiante puede retomar desde la última pregunta respondida. |
| PREGUNTA | Sujeto / Administrador | RF-011 | RN-10: Solo el administrador institucional puede agregar, editar o desactivar preguntas. Las preguntas eliminadas se marcan como inactivas, no se borran físicamente. |
| RESPUESTA | Evaluación | RF-009 | RN-11: Cada respuesta queda asociada al estudiante y al cuestionario. No se permite modificar una respuesta una vez que el cuestionario ha sido enviado definitivamente. |
| RESULTADO | Resultado | RF-012, RF-013, RF-018 | RN-12: El resultado se genera automáticamente al completar el 100% del cuestionario. No se genera resultado parcial. |
| RESULTADO | Resultado | RF-013 | RN-13: El sistema calcula el porcentaje de afinidad para cada área académica. La suma de todos los porcentajes debe ser igual al 100%. |
| CARRERA | Conocimiento | RF-014 | RN-14: Cada carrera sugerida debe tener asociada al menos una área académica, una descripción y un nivel de demanda laboral. No se muestran carreras sin esta información completa. |
| TENDENCIA_LABORAL | Conocimiento | RF-019, RF-022 | RN-15: Los datos de tendencias laborales deben actualizarse al menos una vez por semestre. El sistema muestra la fecha de última actualización al usuario. |
| VINCULACION_PADRE_ESTUDIANTE | Vínculo | RF-001 | RN-16: La vinculación entre padre y estudiante se realiza mediante un código único generado al registrar al estudiante. El código expira a las 72 horas si no es utilizado. |
| ENCUESTA | Sujeto / Administrador | RF-031, RF-032 | RN-17: Una encuesta solo puede ser editada o eliminada si no tiene respuestas registradas. Si ya tiene respuestas, solo puede ser desactivada. |
| ENCUESTA | Sujeto / Administrador | RF-034 | RN-18: Una encuesta debe estar en estado 'publicada' para poder ser asignada a orientadores. No se pueden asignar encuestas en borrador. |
| RESPUESTA_ENCUESTA | Sujeto / Orientador | RF-035 | RN-19: El orientador solo puede responder una encuesta una vez. No se permiten respuestas duplicadas del mismo orientador a la misma encuesta. |
| ESTADISTICA_ENCUESTA | Sujeto / Administrador | RF-033 | RN-20: Las estadísticas de encuestas se calculan automáticamente al recibir cada nueva respuesta. El administrador puede filtrar por institución y período. |
| DETALLE_ESTADISTICA_ENCUESTA | Sujeto / Administrador | RF-033 | RN-21: Cada detalle estadístico registra la cantidad de respuestas por opción. Los detalles se conservan aunque la encuesta sea desactivada, para fines de auditoría. |