-- ============================================================
-- DDL Script - Base de Datos Mi Camino
-- Motor: MySQL
-- ============================================================

-- Tabla: INSTITUCION
CREATE TABLE INSTITUCION (
    id_institucion INT(11) NOT NULL AUTO_INCREMENT,
    nombre         VARCHAR(120) NOT NULL,
    tipo           VARCHAR(50) NOT NULL,
    municipio      VARCHAR(80) NOT NULL,
    estado         VARCHAR(20) NOT NULL,
    PRIMARY KEY (id_institucion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: USUARIO
CREATE TABLE USUARIO (
    id_usuario       INT(11) NOT NULL AUTO_INCREMENT,
    nombre_completo  VARCHAR(100) NOT NULL,
    correo           VARCHAR(100) NOT NULL,
    contrasena       VARCHAR(255) NOT NULL,
    fecha_registro   DATETIME NOT NULL,
    id_institucion   INT(11) NOT NULL,
    PRIMARY KEY (id_usuario),
    CONSTRAINT fk_usuario_institucion FOREIGN KEY (id_institucion)
        REFERENCES INSTITUCION (id_institucion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: ROL
CREATE TABLE ROL (
    id_rol      INT(11) NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255) NULL,
    estado      VARCHAR(20) NOT NULL,
    PRIMARY KEY (id_rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: USUARIO_ROL
CREATE TABLE USUARIO_ROL (
    id_usuario INT(11) NOT NULL,
    id_rol     INT(11) NOT NULL,
    PRIMARY KEY (id_usuario, id_rol),
    CONSTRAINT fk_usuariorol_usuario FOREIGN KEY (id_usuario)
        REFERENCES USUARIO (id_usuario),
    CONSTRAINT fk_usuariorol_rol FOREIGN KEY (id_rol)
        REFERENCES ROL (id_rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: ESTUDIANTE
CREATE TABLE ESTUDIANTE (
    id_usuario      INT(11) NOT NULL,
    grado           VARCHAR(10) NOT NULL,
    grupo           VARCHAR(10) NULL,
    info_academica  TEXT NULL,
    PRIMARY KEY (id_usuario),
    CONSTRAINT fk_estudiante_usuario FOREIGN KEY (id_usuario)
        REFERENCES USUARIO (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: VINCULACION_PADRE_ESTUDIANTE
CREATE TABLE VINCULACION_PADRE_ESTUDIANTE (
    id_vinculacion    INT(11) NOT NULL AUTO_INCREMENT,
    id_usuario        INT(11) NOT NULL,
    estado            VARCHAR(20) NOT NULL,
    fecha_vinculacion DATE NOT NULL,
    PRIMARY KEY (id_vinculacion),
    CONSTRAINT fk_vinculacion_estudiante FOREIGN KEY (id_usuario)
        REFERENCES ESTUDIANTE (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: AREA
CREATE TABLE AREA (
    id_area INT(11) NOT NULL AUTO_INCREMENT,
    nombre  VARCHAR(80) NOT NULL,
    PRIMARY KEY (id_area)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: PREGUNTA
CREATE TABLE PREGUNTA (
    id_pregunta INT(11) NOT NULL AUTO_INCREMENT,
    texto       TEXT NOT NULL,
    tipo        VARCHAR(30) NOT NULL,
    orden       INT(11) NOT NULL,
    id_area     INT(11) NOT NULL,
    PRIMARY KEY (id_pregunta),
    CONSTRAINT fk_pregunta_area FOREIGN KEY (id_area)
        REFERENCES AREA (id_area)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: OPCION_RESPUESTA
CREATE TABLE OPCION_RESPUESTA (
    id_opcion   INT(11) NOT NULL AUTO_INCREMENT,
    id_pregunta INT(11) NOT NULL,
    texto       VARCHAR(255) NOT NULL,
    valor       DECIMAL(5,2) NULL,
    PRIMARY KEY (id_opcion),
    CONSTRAINT fk_opcion_pregunta FOREIGN KEY (id_pregunta)
        REFERENCES PREGUNTA (id_pregunta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: CUESTIONARIO
CREATE TABLE CUESTIONARIO (
    id_cuestionario   INT(11) NOT NULL AUTO_INCREMENT,
    nombre            VARCHAR(100) NOT NULL,
    version           VARCHAR(20) NOT NULL,
    estado            VARCHAR(20) NOT NULL,
    fecha_publicacion DATE NULL,
    id_pregunta       INT(11) NOT NULL,
    PRIMARY KEY (id_cuestionario),
    CONSTRAINT fk_cuestionario_pregunta FOREIGN KEY (id_pregunta)
        REFERENCES PREGUNTA (id_pregunta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: INTENTO_CUESTIONARIO
CREATE TABLE INTENTO_CUESTIONARIO (
    id_intento      INT(11) NOT NULL AUTO_INCREMENT,
    id_estudiante   INT(11) NOT NULL,
    id_cuestionario INT(11) NOT NULL,
    fecha_inicio    DATETIME NOT NULL,
    fecha_fin       DATETIME NULL,
    estado          VARCHAR(20) NOT NULL,
    PRIMARY KEY (id_intento),
    CONSTRAINT fk_intento_estudiante FOREIGN KEY (id_estudiante)
        REFERENCES ESTUDIANTE (id_usuario),
    CONSTRAINT fk_intento_cuestionario FOREIGN KEY (id_cuestionario)
        REFERENCES CUESTIONARIO (id_cuestionario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: RESPUESTA
CREATE TABLE RESPUESTA (
    id_respuesta INT(11) NOT NULL AUTO_INCREMENT,
    id_intento   INT(11) NOT NULL,
    id_pregunta  INT(11) NOT NULL,
    id_opcion    INT(11) NULL,
    valor_texto  TEXT NULL,
    fecha        DATETIME NOT NULL,
    PRIMARY KEY (id_respuesta),
    CONSTRAINT fk_respuesta_intento FOREIGN KEY (id_intento)
        REFERENCES INTENTO_CUESTIONARIO (id_intento),
    CONSTRAINT fk_respuesta_pregunta FOREIGN KEY (id_pregunta)
        REFERENCES PREGUNTA (id_pregunta),
    CONSTRAINT fk_respuesta_opcion FOREIGN KEY (id_opcion)
        REFERENCES OPCION_RESPUESTA (id_opcion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: RESULTADO
CREATE TABLE RESULTADO (
    id_resultado      INT(11) NOT NULL AUTO_INCREMENT,
    id_intento        INT(11) NOT NULL,
    fecha_generacion  DATETIME NOT NULL,
    retroalimentacion TEXT NULL,
    PRIMARY KEY (id_resultado),
    CONSTRAINT fk_resultado_intento FOREIGN KEY (id_intento)
        REFERENCES INTENTO_CUESTIONARIO (id_intento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: AFINIDAD_ACADEMICA
CREATE TABLE AFINIDAD_ACADEMICA (
    id_afinidad  INT(11) NOT NULL AUTO_INCREMENT,
    id_resultado INT(11) NOT NULL,
    id_area      INT(11) NOT NULL,
    porcentaje   DECIMAL(5,2) NOT NULL,
    PRIMARY KEY (id_afinidad),
    CONSTRAINT fk_afinidad_resultado FOREIGN KEY (id_resultado)
        REFERENCES RESULTADO (id_resultado),
    CONSTRAINT fk_afinidad_area FOREIGN KEY (id_area)
        REFERENCES AREA (id_area)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: CARRERA
CREATE TABLE CARRERA (
    id_carrera                   INT(11) NOT NULL AUTO_INCREMENT,
    nombre                       VARCHAR(120) NOT NULL,
    descripcion                  TEXT NULL,
    perfil_profesional           TEXT NULL,
    duracion                     VARCHAR(50) NULL,
    campo_laboral                TEXT NULL,
    nivel_riesgo_automatizacion  VARCHAR(30) NULL,
    PRIMARY KEY (id_carrera)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: RECOMENDACION
CREATE TABLE RECOMENDACION (
    id_recomendacion INT(11) NOT NULL AUTO_INCREMENT,
    id_resultado     INT(11) NOT NULL,
    id_carrera       INT(11) NOT NULL,
    PRIMARY KEY (id_recomendacion),
    CONSTRAINT fk_recomendacion_resultado FOREIGN KEY (id_resultado)
        REFERENCES RESULTADO (id_resultado),
    CONSTRAINT fk_recomendacion_carrera FOREIGN KEY (id_carrera)
        REFERENCES CARRERA (id_carrera)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: TENDENCIA_LABORAL
CREATE TABLE TENDENCIA_LABORAL (
    id_tendencia         INT(11) NOT NULL AUTO_INCREMENT,
    id_carrera           INT(11) NOT NULL,
    nivel_demanda        VARCHAR(50) NOT NULL,
    proyeccion           VARCHAR(100) NULL,
    fecha_actualizacion  DATE NOT NULL,
    fuente               VARCHAR(150) NULL,
    PRIMARY KEY (id_tendencia),
    CONSTRAINT fk_tendencia_carrera FOREIGN KEY (id_carrera)
        REFERENCES CARRERA (id_carrera)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: SECTOR
CREATE TABLE SECTOR (
    id_sector   INT(11) NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR(100) NOT NULL,
    descripcion TEXT NULL,
    PRIMARY KEY (id_sector)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: ESTADISTICA_LABORAL
CREATE TABLE ESTADISTICA_LABORAL (
    id_estadistica   INT(11) NOT NULL AUTO_INCREMENT,
    id_sector        INT(11) NOT NULL,
    nivel_empleo     VARCHAR(50) NOT NULL,
    salario_promedio DECIMAL(12,2) NULL,
    periodo          VARCHAR(30) NOT NULL,
    PRIMARY KEY (id_estadistica),
    CONSTRAINT fk_estadistica_sector FOREIGN KEY (id_sector)
        REFERENCES SECTOR (id_sector)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: ENCUESTA
CREATE TABLE ENCUESTA (
    id_encuesta       INT(11) NOT NULL AUTO_INCREMENT,
    titulo            VARCHAR(150) NOT NULL,
    descripcion       TEXT NULL,
    estado            VARCHAR(20) NOT NULL,
    fecha_creacion    DATETIME NOT NULL,
    fecha_publicacion DATETIME NULL,
    PRIMARY KEY (id_encuesta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: PREGUNTA_ENCUESTA
CREATE TABLE PREGUNTA_ENCUESTA (
    id_pregunta_encuesta INT(11) NOT NULL AUTO_INCREMENT,
    id_encuesta          INT(11) NOT NULL,
    texto                TEXT NOT NULL,
    tipo                 VARCHAR(30) NOT NULL,
    PRIMARY KEY (id_pregunta_encuesta),
    CONSTRAINT fk_preguntaencuesta_encuesta FOREIGN KEY (id_encuesta)
        REFERENCES ENCUESTA (id_encuesta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: RESPUESTA_ENCUESTA
CREATE TABLE RESPUESTA_ENCUESTA (
    id_respuesta_encuesta INT(11) NOT NULL AUTO_INCREMENT,
    id_pregunta_encuesta  INT(11) NOT NULL,
    id_usuario            INT(11) NOT NULL,
    respuesta             TEXT NOT NULL,
    fecha                 DATETIME NOT NULL,
    PRIMARY KEY (id_respuesta_encuesta),
    CONSTRAINT fk_respuestaencuesta_pregunta FOREIGN KEY (id_pregunta_encuesta)
        REFERENCES PREGUNTA_ENCUESTA (id_pregunta_encuesta),
    CONSTRAINT fk_respuestaencuesta_usuario FOREIGN KEY (id_usuario)
        REFERENCES USUARIO (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: ESTADISTICA_ENCUESTA
CREATE TABLE ESTADISTICA_ENCUESTA (
    id_estadistica     INT(11) NOT NULL AUTO_INCREMENT,
    id_encuesta        INT(11) NOT NULL,
    tasa_participacion DECIMAL(5,2) NULL,
    fecha_calculo      DATETIME NOT NULL,
    PRIMARY KEY (id_estadistica),
    CONSTRAINT fk_estadisticaencuesta_encuesta FOREIGN KEY (id_encuesta)
        REFERENCES ENCUESTA (id_encuesta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: DETALLE_ESTADISTICA_ENCUESTA
CREATE TABLE DETALLE_ESTADISTICA_ENCUESTA (
    id_detalle      INT(11) NOT NULL AUTO_INCREMENT,
    id_estadistica  INT(11) NOT NULL,
    opcion          VARCHAR(150) NOT NULL,
    cantidad        INT(11) NOT NULL,
    PRIMARY KEY (id_detalle),
    CONSTRAINT fk_detalle_estadistica FOREIGN KEY (id_estadistica)
        REFERENCES ESTADISTICA_ENCUESTA (id_estadistica)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;