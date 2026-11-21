-- ============================================================
-- SEED UNIFICADO – Mi Camino (Módulo A + Módulo B) – BD única "micamino"
-- Parte 1: datos base del Módulo B (roles, instituciones, sectores, áreas, carreras,
--          tendencias, preguntas/opciones del cuestionario, usuario admin).
-- Parte 2: datos de demostración del Módulo A (carreras y áreas extra, estudiantes demo,
--          un intento finalizado con resultado, afinidades y recomendaciones).
-- Es idempotente (INSERT IGNORE): se puede ejecutar varias veces sin duplicar datos.
-- Ejecutar:  npm run db:seed   (o)   mysql -u root micamino < database/seed.sql
-- ============================================================

USE micamino;
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- ── Roles ──────────────────────────────────────────────────────
INSERT IGNORE INTO rol (id_rol, nombre, descripcion, estado) VALUES
  (1, 'admin',      'Administrador del sistema',       'activo'),
  (2, 'usuario',    'Estudiante de secundaria',         'activo'),
  (3, 'profesor',   'Docente de institución',           'activo'),
  (4, 'orientador', 'Orientador vocacional',            'activo'),
  (5, 'padre',      'Padre de familia o acudiente',     'activo');

-- ── Instituciones ──────────────────────────────────────────────
INSERT IGNORE INTO institucion (id_institucion, nombre, tipo, municipio, estado) VALUES
  (1, 'IE San José',       'Pública', 'Medellín', 'activo'),
  (2, 'Sistema (interna)', 'Sistema', 'Medellín', 'activo');

-- ── Sectores económicos ────────────────────────────────────────
INSERT IGNORE INTO sector (id_sector, nombre, descripcion) VALUES
  (1, 'Secundario / Terciario', 'Información y comunicaciones (CIIU J)'),
  (2, 'Terciario',              'Actividades de atención de la salud (CIIU Q)'),
  (3, 'Secundario',             'Suministro de electricidad y energía (CIIU D)');

-- ── Áreas vocacionales ─────────────────────────────────────────
INSERT IGNORE INTO area (id_area, nombre) VALUES
  (1, 'Ciencias Exactas y Tecnología'),
  (2, 'Humanidades y Comunicación'),
  (3, 'Salud y Ciencias Naturales'),
  (4, 'Administración y Negocios'),
  (5, 'Artes y Diseño');

-- ── Carreras ───────────────────────────────────────────────────
INSERT IGNORE INTO carrera (id_carrera, nombre, descripcion, duracion, nivel_riesgo_automatizacion) VALUES
  (1, 'Ingeniería de Sistemas',    'Diseño y desarrollo de software y sistemas',   '5 años', 'Bajo'),
  (2, 'Medicina',                  'Atención de la salud humana',                  '6 años', 'Bajo'),
  (3, 'Ingeniería Ambiental',      'Gestión de recursos naturales y energía',      '5 años', 'Bajo'),
  (4, 'Licenciatura en Educación', 'Formación de docentes para educación básica',  '4 años', 'Medio'),
  (5, 'Finanzas y Economía',       'Análisis financiero y gestión económica',      '4 años', 'Medio'),
  (6, 'Diseño Gráfico',            'Comunicación visual y diseño multimedia',      '4 años', 'Medio');

-- ── Tendencias laborales ───────────────────────────────────────
INSERT IGNORE INTO tendencia_laboral (id_tendencia, id_carrera, nivel_demanda, proyeccion, fecha_actualizacion, fuente) VALUES
  (1, 1, 'Muy alta', '+40% en 5 años', '2025-01-01', 'MinTIC Colombia 2025'),
  (2, 2, 'Alta',     '+25% en 5 años', '2025-01-01', 'MinSalud Colombia 2025'),
  (3, 3, 'Alta',     '+55% en 5 años', '2025-01-01', 'UPME Colombia 2025'),
  (4, 4, 'Media',    '+10% en 5 años', '2025-01-01', 'MEN Colombia 2025'),
  (5, 5, 'Alta',     '+18% en 5 años', '2025-01-01', 'Bancolombia Research 2025'),
  (6, 6, 'Media',    '+22% en 5 años', '2025-01-01', 'ACIJ Colombia 2025');

-- ── Estadísticas laborales (una por carrera) ──────────────────
INSERT IGNORE INTO estadistica_laboral (id_estadistica, id_sector, nivel_empleo, salario_promedio, periodo) VALUES
  (1, 1, 'Muy alta demanda', 3500000, '2025'),
  (2, 2, 'Alta demanda',     4200000, '2025'),
  (3, 3, 'Alta demanda',     3100000, '2025'),
  (4, 2, 'Media demanda',    2400000, '2025'),
  (5, 2, 'Alta demanda',     3800000, '2025'),
  (6, 2, 'Media demanda',    2800000, '2025');

-- ── Preguntas del cuestionario vocacional ─────────────────────
INSERT IGNORE INTO pregunta (id_pregunta, texto, tipo, orden, id_area) VALUES
  (1, '¿Cuál actividad disfrutas más en clase?',       'opcion_multiple', 1, 1),
  (2, '¿Cómo prefieres aprender algo nuevo?',          'opcion_multiple', 2, 1),
  (3, '¿Qué tipo de problema te motiva más resolver?', 'opcion_multiple', 3, 1);

-- ── Opciones de respuesta ─────────────────────────────────────
INSERT IGNORE INTO opcion_respuesta (id_opcion, id_pregunta, texto, valor) VALUES
  (1,  1, 'Resolver problemas matemáticos',    1.00),
  (2,  1, 'Escribir cuentos o ensayos',        0.00),
  (3,  1, 'Hacer experimentos',                0.00),
  (4,  1, 'Trabajar en equipo',                0.00),
  (5,  2, 'Leyendo y tomando notas',           0.00),
  (6,  2, 'Viendo videos y ejemplos',          0.00),
  (7,  2, 'Practicando directamente',          1.00),
  (8,  2, 'Escuchando a alguien explicar',     0.00),
  (9,  3, 'Ayudar a personas en dificultades', 0.00),
  (10, 3, 'Diseñar algo nuevo y creativo',     0.00),
  (11, 3, 'Analizar datos y encontrar patrones', 1.00),
  (12, 3, 'Organizar y liderar equipos',       0.00);

-- ── Cuestionario principal ────────────────────────────────────
INSERT IGNORE INTO cuestionario (id_cuestionario, nombre, version, estado, fecha_publicacion, id_pregunta) VALUES
  (1, 'Encuesta Vocacional Mi Camino', 'v1.0', 'activo', '2025-01-01', 1);

-- ── Usuario admin inicial ─────────────────────────────────────
INSERT IGNORE INTO usuario (id_usuario, nombre_completo, correo, contrasena, fecha_registro, id_institucion, estado) VALUES
  (1, 'Johao', 'johao@email.com', '1234', NOW(), 2, 'activo');

INSERT IGNORE INTO usuario_rol (id_usuario, id_rol) VALUES (1, 1);

-- ============================================================
-- PARTE 2 – Datos de demostración del Módulo A (Freddy Palacio)
-- UNIFICACIÓN: se ajustaron ids y vocabulario para convivir con los datos del Módulo B
--   * estados en minúscula ('activo', 'completado', ...)
--   * los estudiantes demo usan ids 2-4 (el id 1 es el admin del Módulo B)
--   * el intento demo usa las preguntas/opciones del Módulo B (opción correcta = valor 1.00)
-- ============================================================

-- ── Áreas adicionales del Módulo A ─────────────────────────────
INSERT IGNORE INTO area (id_area, nombre) VALUES
  (6, 'Ingenieria de Software'),
  (7, 'Ingenieria Civil'),
  (8, 'Ingenieria Industrial'),
  (9, 'Ingenieria Electronica');

-- ── Carreras adicionales del Módulo A (Ing. de Sistemas ya existe como id 1) ──
INSERT IGNORE INTO carrera (id_carrera, nombre, descripcion, perfil_profesional, duracion, campo_laboral, nivel_riesgo_automatizacion) VALUES
  (7, 'Ingenieria Civil',       'Diseno y construccion de infraestructura.',     'Diseno estructural, gestion de obra',        '5 anios', 'Construccion, infraestructura publica', 'Medio'),
  (8, 'Ingenieria Industrial',  'Optimizacion de procesos y operaciones.',       'Gestion de procesos, logistica, calidad',    '5 anios', 'Manufactura, logistica, consultoria',   'Medio'),
  (9, 'Ingenieria Electronica', 'Diseno de circuitos y sistemas embebidos.',     'Sistemas embebidos, automatizacion',         '5 anios', 'Telecomunicaciones, automatizacion',    'Bajo');

-- ── Cuestionario secundario (inactivo) del Módulo A ────────────
INSERT IGNORE INTO cuestionario (id_cuestionario, nombre, version, estado, fecha_publicacion, id_pregunta) VALUES
  (2, 'Test de Intereses Profesionales', '1.0', 'inactivo', '2025-11-01', 2);

-- ── Estudiantes demo (usuario + rol 'usuario' + fila en estudiante) ──
INSERT IGNORE INTO usuario (id_usuario, nombre_completo, correo, contrasena, fecha_registro, id_institucion, estado) VALUES
  (2, 'Ana Gomez',      'ana.gomez@demo.edu.co',      'demo123', NOW(), 1, 'activo'),
  (3, 'Carlos Perez',   'carlos.perez@demo.edu.co',   'demo123', NOW(), 1, 'activo'),
  (4, 'Lucia Martinez', 'lucia.martinez@demo.edu.co', 'demo123', NOW(), 1, 'activo');

INSERT IGNORE INTO usuario_rol (id_usuario, id_rol) VALUES (2, 2), (3, 2), (4, 2);

INSERT IGNORE INTO estudiante (id_usuario, grado, grupo, info_academica) VALUES
  (2, '11', 'A', 'Promedio academico alto, interes en tecnologia'),
  (3, '11', 'B', 'Interes en ciencias e ingenieria'),
  (4, '10', 'A', 'Buen desempeno en matematicas');

-- ── Datos transaccionales de ejemplo (intento finalizado de Ana) ──
INSERT IGNORE INTO intento_cuestionario (id_intento, id_estudiante, id_cuestionario, fecha_inicio, fecha_fin, estado) VALUES
  (1, 2, 1, '2026-02-01 09:00:00', '2026-02-01 09:20:00', 'completado');

INSERT IGNORE INTO respuesta (id_respuesta, id_intento, id_pregunta, id_opcion, valor_texto, fecha) VALUES
  (1, 1, 1, 1, NULL, '2026-02-01 09:05:00'),
  (2, 1, 2, 7, NULL, '2026-02-01 09:10:00'),
  (3, 1, 3, 11, NULL, '2026-02-01 09:15:00');

INSERT IGNORE INTO resultado (id_resultado, id_intento, fecha_generacion, retroalimentacion) VALUES
  (1, 1, '2026-02-01 09:21:00', 'Obtuviste 3 de 3 respuestas acertadas (100%). Alta afinidad con Ingenieria de Software.');

INSERT IGNORE INTO afinidad_academica (id_afinidad, id_resultado, id_area, porcentaje) VALUES
  (1, 1, 6, 92.50),
  (2, 1, 8, 60.00);

INSERT IGNORE INTO recomendacion (id_recomendacion, id_resultado, id_carrera) VALUES
  (1, 1, 1);
