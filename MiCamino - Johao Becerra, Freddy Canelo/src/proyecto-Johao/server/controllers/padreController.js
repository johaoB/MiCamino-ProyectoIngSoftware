/**
 * padreController.js
 * Controlador del Módulo de Padre/Acudiente
 *
 * Trazabilidad:
 *  - CU05 – Registrar Padre de Familia y Vincular a Estudiante
 *  - RF-016: Visualización de resultados por padres
 *  - RF-022: Consulta de estabilidad laboral para padres
 */

const pool = require('../db/pool');
const EncuestaModel = require('../models/encuestaModel');

/**
 * getEstudiantePorPadre
 * CU05 – Registrar Padre de Familia y Vincular a Estudiante | RF-016
 * Paso 5: "El sistema valida el código y confirma la relación padre-estudiante"
 *   → consulta vinculacion_padre_estudiante para obtener el estudiante activo vinculado
 * RF-016: permite al padre visualizar los resultados del perfil vocacional del estudiante
 * RF-022: exposición de datos de resultados como base para consulta de estabilidad laboral
 *
 * Flujo Alterno: padre sin vínculo activo → 404 'No tienes ningún estudiante vinculado aún.'
 */
const getEstudiantePorPadre = async (req, res) => {
  try {
    const idPadre = Number(req.params.idPadre);

    // CU05 Postcondición 1: la cuenta del padre queda vinculada al estudiante
    // RF-016: consulta al padre su estudiante vinculado con datos de perfil
    const [[vinculo]] = await pool.query(`
      SELECT v.id_vinculacion, v.id_usuario AS idEstudiante, v.estado, v.fecha_vinculacion,
             u.nombre_completo AS name, u.correo AS email,
             i.nombre AS institucion, e.grado, e.grupo
      FROM vinculacion_padre_estudiante v
      JOIN usuario u     ON v.id_usuario = u.id_usuario
      JOIN institucion i ON u.id_institucion = i.id_institucion
      JOIN estudiante e  ON e.id_usuario = v.id_usuario
      WHERE v.id_padre = ? AND v.estado = 'activo'
      ORDER BY v.fecha_vinculacion DESC
      LIMIT 1
    `, [idPadre]);

    // CU05 Flujo Alterno: sin vínculo activo encontrado
    if (!vinculo) return res.status(404).json({ message: 'No tienes ningún estudiante vinculado aún.' });

    // RF-016: cargar también los resultados vocacionales del estudiante
    const resultado = await EncuestaModel.getResultadoByEstudiante(vinculo.idEstudiante);

    res.json({ estudiante: vinculo, resultado });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getEstudiantePorPadre };
