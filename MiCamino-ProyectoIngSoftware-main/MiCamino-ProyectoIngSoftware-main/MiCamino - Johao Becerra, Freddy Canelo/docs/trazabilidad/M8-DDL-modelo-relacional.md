# MATRICES DE TRAZABILIDAD
**Proyecto: Mi Camino — Orientación Vocacional**

## 9.8 Matriz de Trazabilidad: DDL → Modelo Relacional → PK → FK → Restricciones

| Tabla DDL | Modelo Relacional | PK | FK | Restricciones DDL |
|---|---|---|---|---|
| INSTITUCION | Institución | id_institucion (AUTO_INCREMENT) | — | NOT NULL en nombre, tipo, municipio, estado. ENGINE=InnoDB. |
| USUARIO | Usuario | id_usuario (AUTO_INCREMENT) | id_institucion → INSTITUCION (fk_usuario_institucion) | NOT NULL en nombre_completo, correo, contrasena, estado. UNIQUE en correo. ENGINE=InnoDB. |
| ROL | Rol | id_rol (AUTO_INCREMENT) | — | NOT NULL en nombre, estado. ENGINE=InnoDB. |
| USUARIO_ROL | Usuario-Rol | (id_usuario, id_rol) PK compuesta | id_usuario → USUARIO (fk_usuariorol_usuario); id_rol → ROL (fk_usuariorol_rol) | NOT NULL en ambas FK. ENGINE=InnoDB. |
| ESTUDIANTE | Estudiante | id_estudiante (AUTO_INCREMENT) | id_usuario → USUARIO (fk_estudiante_usuario) | NOT NULL en grado, id_usuario. ENGINE=InnoDB. |
| VINCULACION_PADRE_ESTUDIANTE | Vinculación Padre-Estudiante | id_vinculacion (AUTO_INCREMENT) | id_estudiante → ESTUDIANTE (fk_vinculacion_estudiante); id_padre → USUARIO (fk_vinculacion_padre) | NOT NULL en id_estudiante, id_padre, codigo_vinculacion, estado. ENGINE=InnoDB. |
| CUESTIONARIO | Cuestionario | id_cuestionario (AUTO_INCREMENT) | — | NOT NULL en titulo, estado, fecha_creacion. ENGINE=InnoDB. |
| PREGUNTA | Pregunta | id_pregunta (AUTO_INCREMENT) | id_cuestionario → CUESTIONARIO (fk_pregunta_cuestionario) | NOT NULL en texto_pregunta, tipo, estado. ENGINE=InnoDB. |
| OPCION_RESPUESTA | Opción de Respuesta | id_opcion (AUTO_INCREMENT) | id_pregunta → PREGUNTA (fk_opcion_pregunta) | NOT NULL en texto_opcion, valor. ENGINE=InnoDB. |
| RESPUESTA | Respuesta | id_respuesta (AUTO_INCREMENT) | id_estudiante → ESTUDIANTE; id_pregunta → PREGUNTA; id_opcion → OPCION_RESPUESTA | NOT NULL en id_estudiante, id_pregunta, id_opcion, fecha_respuesta. ENGINE=InnoDB. |
| RESULTADO | Resultado | id_resultado (AUTO_INCREMENT) | id_estudiante → ESTUDIANTE (fk_resultado_estudiante); id_cuestionario → CUESTIONARIO (fk_resultado_cuestionario) | NOT NULL en id_estudiante, id_cuestionario, fecha_generacion. ENGINE=InnoDB. |
| CARRERA | Carrera | id_carrera (AUTO_INCREMENT) | — | NOT NULL en nombre, descripcion, nivel_demanda. ENGINE=InnoDB. |
| RESULTADO_CARRERA | Resultado-Carrera | (id_resultado, id_carrera) PK compuesta | id_resultado → RESULTADO; id_carrera → CARRERA | NOT NULL en porcentaje_afinidad. ENGINE=InnoDB. |
| TENDENCIA_LABORAL | Tendencia Laboral | id_tendencia (AUTO_INCREMENT) | id_carrera → CARRERA (fk_tendencia_carrera) | NOT NULL en sector, demanda_actual, riesgo_automatizacion, fecha_actualizacion. ENGINE=InnoDB. |
| ENCUESTA | Encuesta | id_encuesta (AUTO_INCREMENT) | id_creador → USUARIO (fk_encuesta_creador) | NOT NULL en titulo, estado, fecha_creacion. ENGINE=InnoDB. |
| RESPUESTA_ENCUESTA | Respuesta de Encuesta | id_respuesta_encuesta (AUTO_INCREMENT) | id_encuesta → ENCUESTA (fk_respenc_encuesta); id_orientador → USUARIO (fk_respenc_orientador) | NOT NULL en id_encuesta, id_orientador, fecha_respuesta. UNIQUE(id_encuesta, id_orientador). ENGINE=InnoDB. |
| ESTADISTICA_ENCUESTA | Estadística de Encuesta | id_estadistica (AUTO_INCREMENT) | id_encuesta → ENCUESTA (fk_estadisticaencuesta_encuesta) | NOT NULL en id_encuesta, fecha_calculo. tasa_participacion DECIMAL(5,2) NULL. ENGINE=InnoDB. |
| DETALLE_ESTADISTICA_ENCUESTA | Detalle Estadística | id_detalle (AUTO_INCREMENT) | id_estadistica → ESTADISTICA_ENCUESTA (fk_detalle_estadistica) | NOT NULL en id_estadistica, opcion, cantidad. ENGINE=InnoDB. |