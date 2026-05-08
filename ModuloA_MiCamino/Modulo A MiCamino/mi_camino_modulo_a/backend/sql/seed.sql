-- =============================================================
-- MÓDULO A - ORIENTACIÓN VOCACIONAL (MI CAMINO)
-- Archivo: seed.sql
-- Descripción: Datos de prueba para cuestionario y catálogo base.
-- =============================================================

-- Limpiamos tablas transaccionales y maestras para reseed controlado.
TRUNCATE TABLE recomendacion, afinidad_academica, resultado, respuesta, intento_cuestionario,
               opcion_respuesta, pregunta, carrera, area, cuestionario
RESTART IDENTITY CASCADE;

-- -------------------------------------------------------------
-- CUESTIONARIO BASE
-- -------------------------------------------------------------
INSERT INTO cuestionario (titulo, descripcion, estado)
VALUES (
  'Test Vocacional de Ingeniería - Mi Camino',
  'Evaluación de intereses y habilidades para recomendar carreras de ingeniería con alta demanda laboral actual.',
  'ACTIVO'
);

-- -------------------------------------------------------------
-- ÁREAS DE INGENIERÍA (6 áreas)
-- -------------------------------------------------------------
INSERT INTO area (nombre_area, descripcion_area, estado) VALUES
('Computación', 'Desarrollo de software, sistemas inteligentes, datos y tecnología digital.', 'ACTIVO'),
('Industrial', 'Optimización de procesos, logística, calidad y gestión de operaciones.', 'ACTIVO'),
('Civil', 'Diseño y construcción de infraestructura, obras y planificación territorial.', 'ACTIVO'),
('Mecánica', 'Diseño, mantenimiento y mejora de sistemas mecánicos y energéticos.', 'ACTIVO'),
('Electrónica', 'Automatización, control, telecomunicaciones y sistemas electrónicos.', 'ACTIVO'),
('Ambiental', 'Gestión ambiental, sostenibilidad, recursos naturales y mitigación de impacto.', 'ACTIVO');

-- -------------------------------------------------------------
-- CARRERAS (12 carreras distribuidas en 6 áreas)
-- -------------------------------------------------------------
INSERT INTO carrera (id_area, nombre_carrera, descripcion_carrera, demanda_mercado, estado) VALUES
(1, 'Ingeniería de Sistemas', 'Construcción de software, arquitectura de sistemas y soluciones tecnológicas.', 0.95, 'ACTIVO'),
(1, 'Ingeniería de Datos e IA', 'Análisis de datos, inteligencia artificial y automatización basada en datos.', 0.97, 'ACTIVO'),
(2, 'Ingeniería Industrial', 'Optimización de procesos productivos, logística y productividad empresarial.', 0.88, 'ACTIVO'),
(2, 'Ingeniería de Procesos', 'Diseño y mejora de procesos industriales con enfoque en eficiencia.', 0.82, 'ACTIVO'),
(3, 'Ingeniería Civil', 'Diseño y construcción de obras civiles seguras y sostenibles.', 0.86, 'ACTIVO'),
(3, 'Ingeniería de Transporte y Vías', 'Planeación de movilidad, vías e infraestructura de transporte.', 0.80, 'ACTIVO'),
(4, 'Ingeniería Mecánica', 'Diseño y mantenimiento de maquinaria, sistemas térmicos y manufactura.', 0.84, 'ACTIVO'),
(4, 'Ingeniería Mecatrónica', 'Integración de mecánica, electrónica y control para automatización.', 0.91, 'ACTIVO'),
(5, 'Ingeniería Electrónica', 'Diseño de circuitos, sistemas embebidos y comunicaciones.', 0.89, 'ACTIVO'),
(5, 'Ingeniería en Telecomunicaciones', 'Redes, transmisión de información e infraestructura digital.', 0.87, 'ACTIVO'),
(6, 'Ingeniería Ambiental', 'Evaluación y mitigación de impactos ambientales con enfoque sostenible.', 0.83, 'ACTIVO'),
(6, 'Ingeniería Sanitaria', 'Gestión de agua, saneamiento y salud ambiental en comunidades.', 0.81, 'ACTIVO');

-- -------------------------------------------------------------
-- PREGUNTAS (8 preguntas)
-- -------------------------------------------------------------
INSERT INTO pregunta (id_cuestionario, enunciado, orden_pregunta, estado) VALUES
(1, '¿Qué actividad disfrutas más en clases o proyectos?', 1, 'ACTIVO'),
(1, '¿Qué tipo de problema te motiva resolver?', 2, 'ACTIVO'),
(1, '¿En qué entorno prefieres trabajar?', 3, 'ACTIVO'),
(1, '¿Qué habilidad sientes más fuerte en ti?', 4, 'ACTIVO'),
(1, '¿Qué tecnología te interesa más aprender?', 5, 'ACTIVO'),
(1, 'Al pensar en impacto social, ¿qué te gustaría aportar?', 6, 'ACTIVO'),
(1, 'Cuando haces un trabajo en equipo, ¿qué rol tomas con más frecuencia?', 7, 'ACTIVO'),
(1, '¿Qué tipo de proyecto final te entusiasmaría más?', 8, 'ACTIVO');

-- -------------------------------------------------------------
-- OPCIONES DE RESPUESTA (4 por cada pregunta = 32 opciones)
-- area_puntaje_json: clave=id_area, valor=puntaje
-- -------------------------------------------------------------

-- Pregunta 1
INSERT INTO opcion_respuesta (id_pregunta, texto_opcion, area_puntaje_json, orden_opcion) VALUES
(1, 'Programar una aplicación o videojuego.', '{"1":4,"5":1}', 1),
(1, 'Organizar procesos para que todo funcione mejor.', '{"2":4,"3":1}', 2),
(1, 'Diseñar puentes, edificios o carreteras.', '{"3":4,"4":1}', 3),
(1, 'Diseñar soluciones para reducir contaminación.', '{"6":4,"2":1}', 4);

-- Pregunta 2
INSERT INTO opcion_respuesta (id_pregunta, texto_opcion, area_puntaje_json, orden_opcion) VALUES
(2, 'Automatizar tareas con software y datos.', '{"1":4,"2":1}', 1),
(2, 'Optimizar una línea de producción.', '{"2":4,"4":1}', 2),
(2, 'Calcular estructuras resistentes y seguras.', '{"3":4,"2":1}', 3),
(2, 'Diseñar circuitos y sistemas de control.', '{"5":4,"4":1}', 4);

-- Pregunta 3
INSERT INTO opcion_respuesta (id_pregunta, texto_opcion, area_puntaje_json, orden_opcion) VALUES
(3, 'En oficina creando soluciones digitales.', '{"1":4,"5":1}', 1),
(3, 'En planta o fábrica mejorando procesos.', '{"2":4,"4":1}', 2),
(3, 'En obra supervisando construcción.', '{"3":4,"2":1}', 3),
(3, 'En campo evaluando impacto ambiental.', '{"6":4,"3":1}', 4);

-- Pregunta 4
INSERT INTO opcion_respuesta (id_pregunta, texto_opcion, area_puntaje_json, orden_opcion) VALUES
(4, 'Pensamiento lógico y análisis de algoritmos.', '{"1":4,"5":1}', 1),
(4, 'Planificación y liderazgo de equipos.', '{"2":4,"3":1}', 2),
(4, 'Visualización espacial y diseño estructural.', '{"3":4,"4":1}', 3),
(4, 'Comprensión de máquinas y mecanismos.', '{"4":4,"5":1}', 4);

-- Pregunta 5
INSERT INTO opcion_respuesta (id_pregunta, texto_opcion, area_puntaje_json, orden_opcion) VALUES
(5, 'Inteligencia artificial y desarrollo web.', '{"1":4,"5":1}', 1),
(5, 'Robótica y automatización industrial.', '{"5":3,"4":2,"2":1}', 2),
(5, 'Materiales de construcción e infraestructura.', '{"3":4,"6":1}', 3),
(5, 'Tecnologías limpias y energías renovables.', '{"6":4,"4":1}', 4);

-- Pregunta 6
INSERT INTO opcion_respuesta (id_pregunta, texto_opcion, area_puntaje_json, orden_opcion) VALUES
(6, 'Crear plataformas que mejoren servicios.', '{"1":4,"2":1}', 1),
(6, 'Reducir costos y tiempos en empresas.', '{"2":4,"1":1}', 2),
(6, 'Mejorar movilidad e infraestructura urbana.', '{"3":4,"2":1}', 3),
(6, 'Proteger ecosistemas y recursos hídricos.', '{"6":4,"3":1}', 4);

-- Pregunta 7
INSERT INTO opcion_respuesta (id_pregunta, texto_opcion, area_puntaje_json, orden_opcion) VALUES
(7, 'Analista técnico que define soluciones digitales.', '{"1":4,"5":1}', 1),
(7, 'Coordinador que organiza tareas y tiempos.', '{"2":4,"3":1}', 2),
(7, 'Supervisor de diseño o construcción física.', '{"3":4,"4":1}', 3),
(7, 'Especialista en equipos, sensores o automatización.', '{"5":4,"4":1}', 4);

-- Pregunta 8
INSERT INTO opcion_respuesta (id_pregunta, texto_opcion, area_puntaje_json, orden_opcion) VALUES
(8, 'Una app inteligente que resuelva un problema real.', '{"1":4,"5":1}', 1),
(8, 'Un modelo para hacer más eficiente una empresa.', '{"2":4,"1":1}', 2),
(8, 'Un prototipo mecánico o de infraestructura.', '{"4":3,"3":2}', 3),
(8, 'Un proyecto ambiental con indicadores sostenibles.', '{"6":4,"2":1}', 4);
