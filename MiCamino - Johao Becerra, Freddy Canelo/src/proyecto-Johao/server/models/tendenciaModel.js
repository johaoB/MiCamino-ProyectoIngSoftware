/**
 * tendenciaModel.js
 * Modelo de Tendencias del Mercado Laboral
 *
 * Trazabilidad:
 *  - RF-019: Visualización de tendencias laborales
 *  - RF-020: Estadísticas de empleabilidad local
 *  - RF-021: Información por sectores productivos
 *  - RF-022: Consulta de estabilidad laboral para padres
 */

const pool = require('../db/pool');

/**
 * getTendencias
 * RF-019: Visualización de tendencias laborales (carreras más demandadas en Medellín)
 * RF-020: Estadísticas de empleabilidad local (salario_promedio de estadistica_laboral)
 * RF-021: Información por sectores productivos (JOIN con tabla sector)
 * RF-022: Base para que padres consulten estabilidad laboral de carreras sugeridas
 *
 * Combina tendencia_laboral + carrera + estadistica_laboral + sector
 * para retornar un objeto consolidado por área/carrera con demanda, crecimiento y salario
 */
const getTendencias = async () => {
  // RF-019: tendencias por carrera con nivel de demanda y proyección de crecimiento
  const [tendencias] = await pool.query(`
    SELECT tl.id_tendencia, tl.nivel_demanda, tl.proyeccion AS crecimiento,
           c.nombre AS area
    FROM tendencia_laboral tl
    JOIN carrera c ON tl.id_carrera = c.id_carrera
    ORDER BY tl.id_tendencia
  `);

  // RF-020 / RF-021: estadísticas de empleabilidad por sector productivo
  const [estadisticas] = await pool.query(`
    SELECT el.salario_promedio, s.nombre AS sector, s.descripcion AS clasificacion
    FROM estadistica_laboral el
    JOIN sector s ON el.id_sector = s.id_sector
    ORDER BY el.id_estadistica
  `);

  // RF-019: mapeo de etiquetas de demanda a valores numéricos para visualización
  const demandaMap = { 'Muy alta': 95, 'Alta': 85, 'Media': 70, 'Baja': 50 };

  // RF-019, RF-020, RF-021, RF-022: objeto consolidado para frontend
  return tendencias.map((t, i) => {
    const est = estadisticas[i] || estadisticas[0];
    return {
      area:          t.area,
      sector:        est.sector        || 'General',
      clasificacion: est.clasificacion || est.sector || 'General',
      demanda:       demandaMap[t.nivel_demanda] ?? 70,
      crecimiento:   t.crecimiento,
      // RF-022: salario formateado para consulta de padres sobre estabilidad laboral
      salarioBase:   est.salario_promedio
        ? `$${Number(est.salario_promedio).toLocaleString('es-CO')}`
        : 'No disponible',
    };
  });
};

module.exports = { getTendencias };
