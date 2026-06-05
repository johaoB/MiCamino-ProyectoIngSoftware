# MATRICES DE TRAZABILIDAD
**Proyecto: Mi Camino — Orientación Vocacional**

## 9.6 Matriz de Trazabilidad: Relaciones MER → Cardinalidades → Reglas de Negocio

| Entidad Origen | Relación | Entidad Destino | Cardinalidad | Regla de Negocio |
|---|---|---|---|---|
| USUARIO | tiene asignado | ROL | N:M (a través de USUARIO_ROL) | RN-01: Un usuario puede tener uno o más roles. Un rol puede ser asignado a múltiples usuarios. No se permite un usuario sin rol. |
| USUARIO | pertenece a | INSTITUCION | N:1 | RN-03: Un usuario pertenece a una sola institución. Una institución puede tener múltiples usuarios registrados. |
| ESTUDIANTE | es un | USUARIO | 1:1 | RN-06: Cada estudiante tiene exactamente un registro de usuario asociado. No puede existir un estudiante sin usuario. |
| ESTUDIANTE | vinculado a | VINCULACION_PADRE_ESTUDIANTE | 1:N | RN-07: Un estudiante puede tener máximo una vinculación activa con un padre. Las vinculaciones expiradas se conservan en historial. |
| ESTUDIANTE | responde | CUESTIONARIO | N:M (a través de RESPUESTA) | RN-09: Un estudiante puede responder el cuestionario múltiples veces. Cada sesión de respuesta queda registrada de forma independiente. |
| ESTUDIANTE | obtiene | RESULTADO | 1:N | RN-12: Un estudiante puede tener múltiples resultados (uno por cuestionario completado). El resultado más reciente es el que se muestra por defecto. |
| CUESTIONARIO | contiene | PREGUNTA | 1:N | RN-08: Un cuestionario contiene múltiples preguntas. Una pregunta pertenece a un solo cuestionario. El cuestionario debe tener mínimo 10 preguntas activas. |
| PREGUNTA | tiene | OPCION_RESPUESTA | 1:N | RN-10: Cada pregunta tiene al menos 2 opciones de respuesta. Las opciones eliminadas se marcan como inactivas, no se borran físicamente. |
| RESPUESTA | corresponde a | PREGUNTA | N:1 | RN-11: Cada respuesta está asociada a una pregunta específica. No se permite registrar respuestas sin pregunta asociada. |
| RESULTADO | sugiere | CARRERA | N:M | RN-13: Un resultado puede sugerir múltiples carreras. Una carrera puede aparecer en múltiples resultados. Las carreras se ordenan por porcentaje de afinidad descendente. |
| CARRERA | pertenece a | TENDENCIA_LABORAL | N:1 | RN-15: Cada carrera está asociada a una tendencia laboral. Los datos de tendencia deben actualizarse al menos una vez por semestre. |
| ENCUESTA | creada por | USUARIO (Administrador) | N:1 | RN-17: Solo el administrador puede crear encuestas. Una encuesta pertenece a un único administrador creador. |
| ENCUESTA | asignada a | USUARIO (Orientador) | N:M | RN-18: Una encuesta puede ser asignada a múltiples orientadores. Un orientador puede tener múltiples encuestas asignadas. Solo encuestas publicadas pueden asignarse. |
| RESPUESTA_ENCUESTA | registrada por | USUARIO (Orientador) | N:1 | RN-19: Cada respuesta de encuesta pertenece a un único orientador. Un orientador solo puede responder una vez cada encuesta asignada. |
| ESTADISTICA_ENCUESTA | generada para | ENCUESTA | 1:1 | RN-20: Cada encuesta tiene exactamente una estadística asociada que se actualiza automáticamente con cada nueva respuesta. |
| DETALLE_ESTADISTICA_ENCUESTA | detalla | ESTADISTICA_ENCUESTA | N:1 | RN-21: Una estadística puede tener múltiples detalles (uno por opción de respuesta). Los detalles se conservan aunque la encuesta sea desactivada. |
| INSTITUCION | registrada en | USUARIO | 1:N | RN-05: Una institución puede tener múltiples usuarios. Solo instituciones públicas de Medellín son válidas para el registro. |