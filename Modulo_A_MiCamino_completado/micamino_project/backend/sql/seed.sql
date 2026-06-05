-- ============================================================
-- SEED de datos demo para Módulo A - Mi Camino (MySQL/MariaDB)
-- Respeta el orden de las llaves foráneas del esquema micamino.
-- Ejecutar:  mysql -u root micamino < backend/sql/seed.sql
-- ============================================================

USE `micamino`;

SET FOREIGN_KEY_CHECKS = 0;

-- Limpiamos tablas del Módulo A y dependencias necesarias para la demo.
TRUNCATE TABLE `recomendacion`;
TRUNCATE TABLE `afinidad_academica`;
TRUNCATE TABLE `resultado`;
TRUNCATE TABLE `respuesta`;
TRUNCATE TABLE `intento_cuestionario`;
TRUNCATE TABLE `opcion_respuesta`;
TRUNCATE TABLE `cuestionario`;
TRUNCATE TABLE `pregunta`;
TRUNCATE TABLE `carrera`;
TRUNCATE TABLE `area`;
TRUNCATE TABLE `estudiante`;
TRUNCATE TABLE `usuario`;
TRUNCATE TABLE `institucion`;

SET FOREIGN_KEY_CHECKS = 1;

-- ── Instituciones ────────────────────────────────────────────
INSERT INTO `institucion` (`id_institucion`, `nombre`, `tipo`, `municipio`, `estado`) VALUES
(1, 'I.E. Jose Maria Cordoba', 'Publica', 'Medellin', 'ACTIVO'),
(2, 'I.E. Concejo de Medellin', 'Publica', 'Medellin', 'ACTIVO');

-- ── Usuarios (estudiantes) ───────────────────────────────────
INSERT INTO `usuario` (`id_usuario`, `nombre_completo`, `correo`, `contrasena`, `fecha_registro`, `id_institucion`) VALUES
(1, 'Ana Gomez',       'ana.gomez@demo.edu.co',     'demo123', NOW(), 1),
(2, 'Carlos Perez',    'carlos.perez@demo.edu.co',  'demo123', NOW(), 1),
(3, 'Lucia Martinez',  'lucia.martinez@demo.edu.co','demo123', NOW(), 2);

-- ── Estudiantes (1:1 con usuario) ────────────────────────────
INSERT INTO `estudiante` (`id_usuario`, `grado`, `grupo`, `info_academica`) VALUES
(1, '11', 'A', 'Promedio academico alto, interes en tecnologia'),
(2, '11', 'B', 'Interes en ciencias e ingenieria'),
(3, '10', 'A', 'Buen desempeno en matematicas');

-- ── Areas (maestra) ──────────────────────────────────────────
INSERT INTO `area` (`id_area`, `nombre`) VALUES
(1, 'Ingenieria de Software'),
(2, 'Ingenieria Civil'),
(3, 'Ingenieria Industrial'),
(4, 'Ingenieria Electronica');

-- ── Preguntas (maestra, FK area) ─────────────────────────────
INSERT INTO `pregunta` (`id_pregunta`, `texto`, `tipo`, `orden`, `id_area`) VALUES
(1, 'Que actividad disfrutas mas en tu tiempo libre?', 'OPCION_MULTIPLE', 1, 1),
(2, 'Cual de estas materias te genera mas interes?',   'OPCION_MULTIPLE', 2, 1),
(3, 'Como prefieres resolver un problema complejo?',   'OPCION_MULTIPLE', 3, 2),
(4, 'En que tipo de empresa te imaginas trabajando?',  'OPCION_MULTIPLE', 4, 3);

-- ── Cuestionarios (maestra, FK pregunta inicial) ─────────────
INSERT INTO `cuestionario` (`id_cuestionario`, `nombre`, `version`, `estado`, `fecha_publicacion`, `id_pregunta`) VALUES
(1, 'Test de Orientacion Vocacional', '1.0', 'ACTIVO',   '2026-01-15', 1),
(2, 'Test de Intereses Profesionales','1.0', 'INACTIVO', '2025-11-01', 2);

-- ── Opciones de respuesta (maestra, FK pregunta) ─────────────
INSERT INTO `opcion_respuesta` (`id_opcion`, `id_pregunta`, `texto`, `valor`) VALUES
(1, 1, 'Programar o crear aplicaciones', 5.00),
(2, 1, 'Construir o disenar estructuras', 3.00),
(3, 1, 'Organizar y planificar proyectos', 2.00),
(4, 2, 'Matematicas y logica', 5.00),
(5, 2, 'Fisica y materiales', 3.00),
(6, 3, 'Escribir un algoritmo', 5.00),
(7, 3, 'Hacer calculos estructurales', 4.00),
(8, 4, 'Empresa de tecnologia', 5.00),
(9, 4, 'Constructora o arquitectura', 3.00);

-- ── Carreras (maestra) ───────────────────────────────────────
INSERT INTO `carrera` (`id_carrera`, `nombre`, `descripcion`, `perfil_profesional`, `duracion`, `campo_laboral`, `nivel_riesgo_automatizacion`) VALUES
(1, 'Ingenieria de Sistemas', 'Diseno y desarrollo de software y sistemas de informacion.', 'Desarrollador, arquitecto de software, analista', '5 anios', 'Tecnologia, banca, startups', 'Bajo'),
(2, 'Ingenieria Civil', 'Diseno y construccion de infraestructura.', 'Diseno estructural, gestion de obra', '5 anios', 'Construccion, infraestructura publica', 'Medio'),
(3, 'Ingenieria Industrial', 'Optimizacion de procesos y operaciones.', 'Gestion de procesos, logistica, calidad', '5 anios', 'Manufactura, logistica, consultoria', 'Medio'),
(4, 'Ingenieria Electronica', 'Diseno de circuitos y sistemas embebidos.', 'Sistemas embebidos, automatizacion', '5 anios', 'Telecomunicaciones, automatizacion', 'Bajo');

-- ── Datos transaccionales de ejemplo ─────────────────────────
INSERT INTO `intento_cuestionario` (`id_intento`, `id_estudiante`, `id_cuestionario`, `fecha_inicio`, `fecha_fin`, `estado`) VALUES
(1, 1, 1, '2026-02-01 09:00:00', '2026-02-01 09:20:00', 'FINALIZADO');

INSERT INTO `respuesta` (`id_respuesta`, `id_intento`, `id_pregunta`, `id_opcion`, `valor_texto`, `fecha`) VALUES
(1, 1, 1, 1, NULL, '2026-02-01 09:05:00'),
(2, 1, 2, 4, NULL, '2026-02-01 09:10:00');

INSERT INTO `resultado` (`id_resultado`, `id_intento`, `fecha_generacion`, `retroalimentacion`) VALUES
(1, 1, '2026-02-01 09:21:00', 'Alta afinidad con Ingenieria de Software.');

INSERT INTO `afinidad_academica` (`id_afinidad`, `id_resultado`, `id_area`, `porcentaje`) VALUES
(1, 1, 1, 92.50),
(2, 1, 3, 60.00);

INSERT INTO `recomendacion` (`id_recomendacion`, `id_resultado`, `id_carrera`) VALUES
(1, 1, 1);
