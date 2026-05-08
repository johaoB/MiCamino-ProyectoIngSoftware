// ============================================================
// CONTROLADOR CON DATOS MOCK - SIN BASE DE DATOS
// Para demo local / presentación a profesora
// ============================================================

// Función auxiliar para redondear porcentajes a 2 decimales.
const redondear = (valor) => Number(valor.toFixed(2));

// ── Datos mock del cuestionario ──────────────────────────────

const AREAS_MOCK = [
  { id_area: 1, nombre_area: 'Ingeniería de Software' },
  { id_area: 2, nombre_area: 'Ingeniería Civil' },
  { id_area: 3, nombre_area: 'Ingeniería Industrial' },
  { id_area: 4, nombre_area: 'Ingeniería Electrónica' }
];

const CARRERAS_MOCK = [
  {
    id_carrera: 1, id_area: 1,
    nombre_carrera: 'Ingeniería de Sistemas',
    descripcion_carrera: 'Diseño y desarrollo de software, sistemas de información y tecnologías digitales.',
    demanda_mercado: 0.95
  },
  {
    id_carrera: 2, id_area: 1,
    nombre_carrera: 'Ingeniería de Software',
    descripcion_carrera: 'Especialización en construcción de aplicaciones robustas y metodologías ágiles.',
    demanda_mercado: 0.93
  },
  {
    id_carrera: 3, id_area: 2,
    nombre_carrera: 'Ingeniería Civil',
    descripcion_carrera: 'Diseño y construcción de infraestructura: edificios, puentes, vías.',
    demanda_mercado: 0.80
  },
  {
    id_carrera: 4, id_area: 3,
    nombre_carrera: 'Ingeniería Industrial',
    descripcion_carrera: 'Optimización de procesos productivos, logística y gestión de operaciones.',
    demanda_mercado: 0.85
  },
  {
    id_carrera: 5, id_area: 4,
    nombre_carrera: 'Ingeniería Electrónica',
    descripcion_carrera: 'Diseño de circuitos, sistemas embebidos, telecomunicaciones y automatización.',
    demanda_mercado: 0.88
  }
];

const CUESTIONARIO_MOCK = {
  id_cuestionario: 1,
  titulo: 'Test de Orientación Vocacional - Módulo A',
  descripcion: 'Responde con sinceridad. No hay respuestas correctas o incorrectas.',
  preguntas: [
    {
      idPregunta: 1,
      enunciado: '¿Qué actividad disfrutas más en tu tiempo libre?',
      ordenPregunta: 1,
      opciones: [
        { idOpcion: 1, textoOpcion: 'Programar o crear aplicaciones', areaPuntaje: { '1': 5, '2': 1, '3': 2, '4': 3 } },
        { idOpcion: 2, textoOpcion: 'Construir o diseñar estructuras físicas', areaPuntaje: { '1': 1, '2': 5, '3': 2, '4': 2 } },
        { idOpcion: 3, textoOpcion: 'Organizar y planificar proyectos', areaPuntaje: { '1': 2, '2': 2, '3': 5, '4': 1 } },
        { idOpcion: 4, textoOpcion: 'Armar o reparar dispositivos electrónicos', areaPuntaje: { '1': 3, '2': 2, '3': 1, '4': 5 } }
      ]
    },
    {
      idPregunta: 2,
      enunciado: '¿Cuál de estas materias te genera más interés?',
      ordenPregunta: 2,
      opciones: [
        { idOpcion: 5, textoOpcion: 'Matemáticas y lógica', areaPuntaje: { '1': 5, '2': 3, '3': 3, '4': 4 } },
        { idOpcion: 6, textoOpcion: 'Física y materiales', areaPuntaje: { '1': 2, '2': 5, '3': 2, '4': 4 } },
        { idOpcion: 7, textoOpcion: 'Economía y administración', areaPuntaje: { '1': 2, '2': 2, '3': 5, '4': 1 } },
        { idOpcion: 8, textoOpcion: 'Electrónica y circuitos', areaPuntaje: { '1': 3, '2': 2, '3': 1, '4': 5 } }
      ]
    },
    {
      idPregunta: 3,
      enunciado: '¿Cómo prefieres resolver un problema complejo?',
      ordenPregunta: 3,
      opciones: [
        { idOpcion: 9,  textoOpcion: 'Escribir un algoritmo o programa', areaPuntaje: { '1': 5, '2': 1, '3': 2, '4': 3 } },
        { idOpcion: 10, textoOpcion: 'Hacer cálculos estructurales y planos', areaPuntaje: { '1': 1, '2': 5, '3': 2, '4': 2 } },
        { idOpcion: 11, textoOpcion: 'Diseñar un plan de acción paso a paso', areaPuntaje: { '1': 2, '2': 2, '3': 5, '4': 2 } },
        { idOpcion: 12, textoOpcion: 'Analizar el circuito o sistema físico', areaPuntaje: { '1': 2, '2': 2, '3': 1, '4': 5 } }
      ]
    },
    {
      idPregunta: 4,
      enunciado: '¿En qué tipo de empresa te imaginas trabajando?',
      ordenPregunta: 4,
      opciones: [
        { idOpcion: 13, textoOpcion: 'Empresa de tecnología o startup digital', areaPuntaje: { '1': 5, '2': 1, '3': 2, '4': 3 } },
        { idOpcion: 14, textoOpcion: 'Constructora o firma de arquitectura', areaPuntaje: { '1': 1, '2': 5, '3': 2, '4': 1 } },
        { idOpcion: 15, textoOpcion: 'Multinacional o empresa de manufactura', areaPuntaje: { '1': 2, '2': 2, '3': 5, '4': 2 } },
        { idOpcion: 16, textoOpcion: 'Empresa de telecomunicaciones o automatización', areaPuntaje: { '1': 3, '2': 1, '3': 2, '4': 5 } }
      ]
    },
    {
      idPregunta: 5,
      enunciado: '¿Qué habilidad sientes que tienes más desarrollada?',
      ordenPregunta: 5,
      opciones: [
        { idOpcion: 17, textoOpcion: 'Pensamiento lógico y resolución de bugs', areaPuntaje: { '1': 5, '2': 2, '3': 2, '4': 3 } },
        { idOpcion: 18, textoOpcion: 'Visión espacial y trabajo en terreno', areaPuntaje: { '1': 1, '2': 5, '3': 2, '4': 2 } },
        { idOpcion: 19, textoOpcion: 'Gestión del tiempo y equipos de trabajo', areaPuntaje: { '1': 2, '2': 2, '3': 5, '4': 1 } },
        { idOpcion: 20, textoOpcion: 'Manejo de instrumentos y mediciones', areaPuntaje: { '1': 2, '2': 2, '3': 1, '4': 5 } }
      ]
    },
    {
      idPregunta: 6,
      enunciado: '¿Qué proyecto de grado te parecería más interesante?',
      ordenPregunta: 6,
      opciones: [
        { idOpcion: 21, textoOpcion: 'Desarrollar una app móvil o web', areaPuntaje: { '1': 5, '2': 1, '3': 2, '4': 2 } },
        { idOpcion: 22, textoOpcion: 'Diseñar un puente o edificio sostenible', areaPuntaje: { '1': 1, '2': 5, '3': 2, '4': 1 } },
        { idOpcion: 23, textoOpcion: 'Optimizar la cadena de suministro de una empresa', areaPuntaje: { '1': 2, '2': 1, '3': 5, '4': 2 } },
        { idOpcion: 24, textoOpcion: 'Diseñar un robot o sistema de control automático', areaPuntaje: { '1': 3, '2': 1, '3': 1, '4': 5 } }
      ]
    },
    {
      idPregunta: 7,
      enunciado: '¿Cuál de estos impactos te motiva más al elegir tu carrera?',
      ordenPregunta: 7,
      opciones: [
        { idOpcion: 25, textoOpcion: 'Transformar la sociedad mediante la innovación digital', areaPuntaje: { '1': 5, '2': 1, '3': 2, '4': 3 } },
        { idOpcion: 26, textoOpcion: 'Construir infraestructura que mejore calidad de vida', areaPuntaje: { '1': 1, '2': 5, '3': 2, '4': 1 } },
        { idOpcion: 27, textoOpcion: 'Mejorar la eficiencia de las organizaciones', areaPuntaje: { '1': 2, '2': 2, '3': 5, '4': 2 } },
        { idOpcion: 28, textoOpcion: 'Crear tecnología que automatice procesos peligrosos', areaPuntaje: { '1': 2, '2': 2, '3': 2, '4': 5 } }
      ]
    },
    {
      idPregunta: 8,
      enunciado: '¿Cuál de estas actividades te resulta más natural?',
      ordenPregunta: 8,
      opciones: [
        { idOpcion: 29, textoOpcion: 'Depurar código y encontrar errores de lógica', areaPuntaje: { '1': 5, '2': 1, '3': 1, '4': 3 } },
        { idOpcion: 30, textoOpcion: 'Interpretar planos y calcular resistencias', areaPuntaje: { '1': 1, '2': 5, '3': 2, '4': 2 } },
        { idOpcion: 31, textoOpcion: 'Analizar costos y proyectar tiempos de entrega', areaPuntaje: { '1': 1, '2': 2, '3': 5, '4': 1 } },
        { idOpcion: 32, textoOpcion: 'Leer datasheets y conectar componentes', areaPuntaje: { '1': 2, '2': 2, '3': 1, '4': 5 } }
      ]
    }
  ]
};

// ── Controladores ─────────────────────────────────────────────

// Devuelve el cuestionario con preguntas y opciones (sin BD).
const obtenerCuestionarioActivo = async (req, res) => {
  try {
    return res.json({
      idCuestionario: CUESTIONARIO_MOCK.id_cuestionario,
      titulo: CUESTIONARIO_MOCK.titulo,
      descripcion: CUESTIONARIO_MOCK.descripcion,
      totalPreguntas: CUESTIONARIO_MOCK.preguntas.length,
      preguntas: CUESTIONARIO_MOCK.preguntas
    });
  } catch (error) {
    console.error('Error al obtener cuestionario:', error);
    return res.status(500).json({ mensaje: 'Error interno al consultar el cuestionario.' });
  }
};

// Procesa respuestas en memoria y calcula resultados (sin BD).
const finalizarCuestionario = async (req, res) => {
  const { idCuestionario, nombreParticipante, respuestas } = req.body;

  if (!idCuestionario) {
    return res.status(400).json({ mensaje: 'El campo idCuestionario es obligatorio.' });
  }
  if (!Array.isArray(respuestas) || respuestas.length === 0) {
    return res.status(400).json({ mensaje: 'Debe enviar al menos una respuesta.' });
  }

  try {
    // Construimos mapa de opciones desde datos mock.
    const opcionMap = new Map();
    CUESTIONARIO_MOCK.preguntas.forEach((pregunta) => {
      pregunta.opciones.forEach((opcion) => {
        opcionMap.set(opcion.idOpcion, { ...opcion, id_pregunta: pregunta.idPregunta });
      });
    });

    // Inicializamos puntajes y máximos por área.
    const puntajesPorArea = {};
    const maximosPorArea = {};
    AREAS_MOCK.forEach((area) => {
      puntajesPorArea[area.id_area] = 0;
      maximosPorArea[area.id_area] = 0;
    });

    // Calculamos máximo posible por área (mejor opción en cada pregunta).
    CUESTIONARIO_MOCK.preguntas.forEach((pregunta) => {
      const maximoAreaPregunta = {};
      pregunta.opciones.forEach((opcion) => {
        const puntajeJson = opcion.areaPuntaje || {};
        Object.keys(puntajeJson).forEach((idArea) => {
          const puntaje = Number(puntajeJson[idArea] || 0);
          maximoAreaPregunta[idArea] = Math.max(maximoAreaPregunta[idArea] || 0, puntaje);
        });
      });
      Object.keys(maximoAreaPregunta).forEach((idArea) => {
        maximosPorArea[idArea] = (maximosPorArea[idArea] || 0) + maximoAreaPregunta[idArea];
      });
    });

    // Acumulamos puntajes según las respuestas recibidas.
    for (const respuesta of respuestas) {
      const opcion = opcionMap.get(respuesta.idOpcion);
      if (!opcion) {
        return res.status(400).json({ mensaje: `La opción ${respuesta.idOpcion} no existe.` });
      }
      const puntajeJson = opcion.areaPuntaje || {};
      Object.keys(puntajeJson).forEach((idArea) => {
        puntajesPorArea[idArea] = (puntajesPorArea[idArea] || 0) + Number(puntajeJson[idArea] || 0);
      });
    }

    // Calculamos afinidades en porcentaje.
    const afinidades = AREAS_MOCK.map((area) => {
      const puntajeTotal = Number(puntajesPorArea[area.id_area] || 0);
      const maximoArea = Number(maximosPorArea[area.id_area] || 1);
      const porcentajeAfinidad = maximoArea > 0 ? redondear((puntajeTotal / maximoArea) * 100) : 0;
      return { idArea: area.id_area, nombreArea: area.nombre_area, puntajeTotal, porcentajeAfinidad };
    });

    afinidades.sort((a, b) => b.porcentajeAfinidad - a.porcentajeAfinidad);
    const afinidadPrincipal = afinidades[0];

    const explicacionPersonalizada = `Tu mayor afinidad está en ${afinidadPrincipal.nombreArea}. Tus respuestas muestran interés y habilidades destacadas para resolver problemas de esta área, combinando análisis, aplicación técnica y enfoque en innovación.`;

    // Calculamos recomendaciones de carreras.
    const recomendacionesCalculadas = CARRERAS_MOCK.map((carrera) => {
      const afinidadArea = afinidades.find((a) => a.idArea === carrera.id_area);
      const porcentajeBase = Number(afinidadArea?.porcentajeAfinidad || 0);
      const demanda = Number(carrera.demanda_mercado || 0);
      const porcentajeAfinidad = redondear((porcentajeBase * 0.85) + (demanda * 100 * 0.15));
      return {
        idCarrera: carrera.id_carrera,
        nombreCarrera: carrera.nombre_carrera,
        descripcionCarrera: carrera.descripcion_carrera,
        porcentajeAfinidad,
        razonRecomendacion: `Se recomienda por tu afinidad en ${afinidadArea?.nombreArea || 'área relacionada'} y por su demanda actual en el mercado laboral.`
      };
    });

    recomendacionesCalculadas.sort((a, b) => b.porcentajeAfinidad - a.porcentajeAfinidad);
    const top3Recomendaciones = recomendacionesCalculadas.slice(0, 3);

    return res.status(201).json({
      mensaje: 'Cuestionario finalizado correctamente.',
      resultado: {
        idResultado: Date.now(), // ID temporal en memoria
        areaPrincipal: afinidadPrincipal.nombreArea,
        porcentajePrincipal: afinidadPrincipal.porcentajeAfinidad,
        explicacionPersonalizada,
        afinidades,
        recomendaciones: top3Recomendaciones
      }
    });
  } catch (error) {
    console.error('Error al finalizar cuestionario:', error);
    return res.status(500).json({ mensaje: 'Error interno al procesar el cuestionario.' });
  }
};

module.exports = { obtenerCuestionarioActivo, finalizarCuestionario };
