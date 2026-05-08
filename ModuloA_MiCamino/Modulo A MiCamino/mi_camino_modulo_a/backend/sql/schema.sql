-- =============================================================
-- MÓDULO A - ORIENTACIÓN VOCACIONAL (MI CAMINO)
-- Archivo: schema.sql
-- Descripción: DDL completo de las 10 tablas del módulo.
-- Motor: PostgreSQL
-- =============================================================

-- Eliminamos tablas en orden inverso de dependencia para evitar errores de FK.
DROP TABLE IF EXISTS recomendacion CASCADE;
DROP TABLE IF EXISTS afinidad_academica CASCADE;
DROP TABLE IF EXISTS resultado CASCADE;
DROP TABLE IF EXISTS respuesta CASCADE;
DROP TABLE IF EXISTS intento_cuestionario CASCADE;
DROP TABLE IF EXISTS opcion_respuesta CASCADE;
DROP TABLE IF EXISTS pregunta CASCADE;
DROP TABLE IF EXISTS carrera CASCADE;
DROP TABLE IF EXISTS area CASCADE;
DROP TABLE IF EXISTS cuestionario CASCADE;

-- =============================================================
-- 1) CUESTIONARIO (MAESTRA)
-- =============================================================
CREATE TABLE cuestionario (
  id_cuestionario SERIAL PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT NOT NULL,
  estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
  fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT ck_cuestionario_estado CHECK (estado IN ('ACTIVO', 'INACTIVO'))
);

-- =============================================================
-- 2) AREA (MAESTRA)
-- =============================================================
CREATE TABLE area (
  id_area SERIAL PRIMARY KEY,
  nombre_area VARCHAR(100) NOT NULL UNIQUE,
  descripcion_area TEXT NOT NULL,
  estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
  CONSTRAINT ck_area_estado CHECK (estado IN ('ACTIVO', 'INACTIVO'))
);

-- =============================================================
-- 3) CARRERA (MAESTRA)
-- =============================================================
CREATE TABLE carrera (
  id_carrera SERIAL PRIMARY KEY,
  id_area INT NOT NULL,
  nombre_carrera VARCHAR(150) NOT NULL UNIQUE,
  descripcion_carrera TEXT NOT NULL,
  demanda_mercado NUMERIC(4,3) NOT NULL DEFAULT 0.700,
  estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
  CONSTRAINT fk_carrera_area FOREIGN KEY (id_area)
    REFERENCES area(id_area)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT ck_carrera_demanda CHECK (demanda_mercado >= 0 AND demanda_mercado <= 1),
  CONSTRAINT ck_carrera_estado CHECK (estado IN ('ACTIVO', 'INACTIVO'))
);

-- =============================================================
-- 4) PREGUNTA (MAESTRA)
-- =============================================================
CREATE TABLE pregunta (
  id_pregunta SERIAL PRIMARY KEY,
  id_cuestionario INT NOT NULL,
  enunciado TEXT NOT NULL,
  orden_pregunta INT NOT NULL,
  estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
  CONSTRAINT fk_pregunta_cuestionario FOREIGN KEY (id_cuestionario)
    REFERENCES cuestionario(id_cuestionario)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT uq_pregunta_orden UNIQUE (id_cuestionario, orden_pregunta),
  CONSTRAINT ck_pregunta_estado CHECK (estado IN ('ACTIVO', 'INACTIVO'))
);

-- =============================================================
-- 5) OPCION_RESPUESTA (MAESTRA)
-- area_puntaje_json almacena puntajes por área, ej: {"1":3,"2":1}
-- =============================================================
CREATE TABLE opcion_respuesta (
  id_opcion SERIAL PRIMARY KEY,
  id_pregunta INT NOT NULL,
  texto_opcion VARCHAR(220) NOT NULL,
  area_puntaje_json JSONB NOT NULL,
  orden_opcion INT NOT NULL,
  CONSTRAINT fk_opcion_pregunta FOREIGN KEY (id_pregunta)
    REFERENCES pregunta(id_pregunta)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT uq_opcion_orden UNIQUE (id_pregunta, orden_opcion)
);

-- =============================================================
-- 6) INTENTO_CUESTIONARIO (TRANSACCIONAL)
-- =============================================================
CREATE TABLE intento_cuestionario (
  id_intento SERIAL PRIMARY KEY,
  id_cuestionario INT NOT NULL,
  nombre_participante VARCHAR(120) NOT NULL,
  estado_intento VARCHAR(20) NOT NULL DEFAULT 'EN_PROGRESO',
  fecha_inicio TIMESTAMP NOT NULL DEFAULT NOW(),
  fecha_fin TIMESTAMP,
  CONSTRAINT fk_intento_cuestionario FOREIGN KEY (id_cuestionario)
    REFERENCES cuestionario(id_cuestionario)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT ck_intento_estado CHECK (estado_intento IN ('EN_PROGRESO', 'FINALIZADO', 'PAUSADO', 'ERROR'))
);

-- =============================================================
-- 7) RESPUESTA (TRANSACCIONAL)
-- =============================================================
CREATE TABLE respuesta (
  id_respuesta SERIAL PRIMARY KEY,
  id_intento INT NOT NULL,
  id_pregunta INT NOT NULL,
  id_opcion INT NOT NULL,
  puntaje_aplicado_json JSONB NOT NULL,
  fecha_respuesta TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_respuesta_intento FOREIGN KEY (id_intento)
    REFERENCES intento_cuestionario(id_intento)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_respuesta_pregunta FOREIGN KEY (id_pregunta)
    REFERENCES pregunta(id_pregunta)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_respuesta_opcion FOREIGN KEY (id_opcion)
    REFERENCES opcion_respuesta(id_opcion)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT uq_respuesta_intento_pregunta UNIQUE (id_intento, id_pregunta)
);

-- =============================================================
-- 8) RESULTADO (TRANSACCIONAL)
-- =============================================================
CREATE TABLE resultado (
  id_resultado SERIAL PRIMARY KEY,
  id_intento INT NOT NULL UNIQUE,
  id_area_principal INT NOT NULL,
  porcentaje_principal NUMERIC(5,2) NOT NULL,
  explicacion_personalizada TEXT NOT NULL,
  fecha_calculo TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_resultado_intento FOREIGN KEY (id_intento)
    REFERENCES intento_cuestionario(id_intento)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_resultado_area FOREIGN KEY (id_area_principal)
    REFERENCES area(id_area)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT ck_resultado_porcentaje CHECK (porcentaje_principal >= 0 AND porcentaje_principal <= 100)
);

-- =============================================================
-- 9) AFINIDAD_ACADEMICA (TRANSACCIONAL)
-- =============================================================
CREATE TABLE afinidad_academica (
  id_afinidad SERIAL PRIMARY KEY,
  id_resultado INT NOT NULL,
  id_area INT NOT NULL,
  puntaje_total NUMERIC(7,2) NOT NULL,
  porcentaje_afinidad NUMERIC(5,2) NOT NULL,
  CONSTRAINT fk_afinidad_resultado FOREIGN KEY (id_resultado)
    REFERENCES resultado(id_resultado)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_afinidad_area FOREIGN KEY (id_area)
    REFERENCES area(id_area)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT uq_afinidad_resultado_area UNIQUE (id_resultado, id_area),
  CONSTRAINT ck_afinidad_porcentaje CHECK (porcentaje_afinidad >= 0 AND porcentaje_afinidad <= 100)
);

-- =============================================================
-- 10) RECOMENDACION (TRANSACCIONAL)
-- =============================================================
CREATE TABLE recomendacion (
  id_recomendacion SERIAL PRIMARY KEY,
  id_resultado INT NOT NULL,
  id_carrera INT NOT NULL,
  porcentaje_afinidad NUMERIC(5,2) NOT NULL,
  orden_recomendacion INT NOT NULL,
  razon_recomendacion TEXT NOT NULL,
  CONSTRAINT fk_recomendacion_resultado FOREIGN KEY (id_resultado)
    REFERENCES resultado(id_resultado)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_recomendacion_carrera FOREIGN KEY (id_carrera)
    REFERENCES carrera(id_carrera)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT uq_recomendacion_orden UNIQUE (id_resultado, orden_recomendacion),
  CONSTRAINT ck_recomendacion_porcentaje CHECK (porcentaje_afinidad >= 0 AND porcentaje_afinidad <= 100)
);

-- Índices adicionales para acelerar consultas frecuentes.
CREATE INDEX idx_pregunta_cuestionario ON pregunta(id_cuestionario);
CREATE INDEX idx_opcion_pregunta ON opcion_respuesta(id_pregunta);
CREATE INDEX idx_carrera_area ON carrera(id_area);
CREATE INDEX idx_respuesta_intento ON respuesta(id_intento);
CREATE INDEX idx_afinidad_resultado ON afinidad_academica(id_resultado);
CREATE INDEX idx_recomendacion_resultado ON recomendacion(id_resultado);
