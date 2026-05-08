# MATRICES DE TRAZABILIDAD
**Proyecto: Mi Camino — Orientación Vocacional**

## 9.7 Matriz de Trazabilidad: Tablas Relacionales → MER → PK → FK → Forma Normal

| Tabla Relacional | Entidad MER | Clave Primaria (PK) | Clave(s) Foránea(s) (FK) | Forma Normal | Justificación |
|---|---|---|---|---|---|
| USUARIO | Usuario | id_usuario (AUTO_INCREMENT) | id_institucion → INSTITUCION | 3FN | Todos los atributos dependen únicamente de la PK. No hay dependencias transitivas. |
| ROL | Rol | id_rol (AUTO_INCREMENT) | — | 3FN | Tabla simple con atributos que dependen directamente de la PK. |
| USUARIO_ROL | Usuario-Rol (tabla intermedia) | id_usuario + id_rol (PK compuesta) | id_usuario → USUARIO; id_rol → ROL | 3FN | Tabla de relación N:M. Cada atributo depende de la clave compuesta completa. |
| INSTITUCION | Institución | id_institucion (AUTO_INCREMENT) | — | 3FN | Todos los atributos describen directamente a la institución sin dependencias transitivas. |
| ESTUDIANTE | Estudiante | id_estudiante (AUTO_INCREMENT) | id_usuario → USUARIO | 3FN | Los atributos del estudiante dependen únicamente de id_estudiante. |
| VINCULACION_PADRE_ESTUDIANTE | Vinculación Padre-Estudiante | id_vinculacion (AUTO_INCREMENT) | id_estudiante → ESTUDIANTE; id_padre → USUARIO | 3FN | Registra la relación entre padre y estudiante. Atributos dependen de la PK. |
| CUESTIONARIO | Cuestionario | id_cuestionario (AUTO_INCREMENT) | — | 3FN | Atributos del cuestionario dependen directamente de su PK. |
| PREGUNTA | Pregunta | id_pregunta (AUTO_INCREMENT) | id_cuestionario → CUESTIONARIO | 3FN | Cada pregunta pertenece a un cuestionario. Sin dependencias transitivas. |
| OPCION_RESPUESTA | Opción de Respuesta | id_opcion (AUTO_INCREMENT) | id_pregunta → PREGUNTA | 3FN | Las opciones dependen de la pregunta a la que pertenecen. |
| RESPUESTA | Respuesta | id_respuesta (AUTO_INCREMENT) | id_estudiante → ESTUDIANTE; id_pregunta → PREGUNTA; id_opcion → OPCION_RESPUESTA | 3FN | Registra la respuesta de un estudiante a una pregunta específica. |
| RESULTADO | Resultado | id_resultado (AUTO_INCREMENT) | id_estudiante → ESTUDIANTE; id_cuestionario → CUESTIONARIO | 3FN | El resultado depende del estudiante y del cuestionario completado. |
| CARRERA | Carrera | id_carrera (AUTO_INCREMENT) | — | 3FN | Atributos de la carrera dependen directamente de su PK. |
| RESULTADO_CARRERA | Resultado-Carrera (tabla intermedia) | id_resultado + id_carrera (PK compuesta) | id_resultado → RESULTADO; id_carrera → CARRERA | 3FN | Tabla de relación N:M entre resultados y carreras sugeridas. |
| TENDENCIA_LABORAL | Tendencia Laboral | id_tendencia (AUTO_INCREMENT) | id_carrera → CARRERA | 3FN | Los datos de tendencia dependen de la carrera asociada. |
| ENCUESTA | Encuesta | id_encuesta (AUTO_INCREMENT) | id_creador → USUARIO | 3FN | Atributos de la encuesta dependen de su PK. El creador es referenciado por FK. |
| RESPUESTA_ENCUESTA | Respuesta de Encuesta | id_respuesta_encuesta (AUTO_INCREMENT) | id_encuesta → ENCUESTA; id_orientador → USUARIO | 3FN | Registra la respuesta de un orientador a una encuesta específica. |
| ESTADISTICA_ENCUESTA | Estadística de Encuesta | id_estadistica (AUTO_INCREMENT) | id_encuesta → ENCUESTA | 3FN | La estadística depende directamente de la encuesta evaluada. |
| DETALLE_ESTADISTICA_ENCUESTA | Detalle Estadística | id_detalle (AUTO_INCREMENT) | id_estadistica → ESTADISTICA_ENCUESTA | 3FN | Cada detalle depende de la estadística a la que pertenece. |