const Model = require('../models/userModel');

const getEncuesta = (req, res) => {
  // Devuelve preguntas sin revelar la respuesta correcta
  const preguntas = Model.encuesta.map(({ id, pregunta, opciones }) => ({ id, pregunta, opciones }));
  res.json(preguntas);
};

const submitEncuesta = (req, res) => {
  const { codigoEstudiante, respuestas } = req.body;
  // respuestas: [{ preguntaId, opcionSeleccionada }]

  if (!codigoEstudiante || !respuestas)
    return res.status(400).json({ message: 'Datos incompletos' });

  let puntaje = 0;
  const detalle = respuestas.map((r) => {
    const pregunta = Model.encuesta.find((p) => p.id === r.preguntaId);
    if (!pregunta) return null;
    const correcta = r.opcionSeleccionada === pregunta.correcta;
    if (correcta) puntaje++;
    return {
      pregunta: pregunta.pregunta,
      opcionElegida: pregunta.opciones[r.opcionSeleccionada],
      opcionCorrecta: pregunta.opciones[pregunta.correcta],
      correcta,
      feedback: correcta ? pregunta.feedback.bien : pregunta.feedback.mal,
    };
  });

  const resultado = {
    fecha: new Date().toLocaleDateString('es-CO'),
    puntaje,
    total: Model.encuesta.length,
    porcentaje: Math.round((puntaje / Model.encuesta.length) * 100),
    detalle,
  };

  Model.guardarResultado(codigoEstudiante, resultado);
  res.json(resultado);
};

const getResultado = (req, res) => {
  const { codigo } = req.params;
  const resultado = Model.obtenerResultado(codigo);
  if (!resultado) return res.status(404).json({ message: 'Sin resultados aún' });
  res.json(resultado);
};

const getTendencias = (req, res) => {
  res.json(Model.tendenciasLaborales);
};

module.exports = { getEncuesta, submitEncuesta, getResultado, getTendencias };
