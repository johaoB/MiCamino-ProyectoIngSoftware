// ─── Usuarios ────────────────────────────────────────────────
let users = [
  { id: 1, name: 'Johao',   email: 'johao@email.com',   password: '1234', role: 'admin' },
  { id: 2, name: 'Ana',     email: 'ana@email.com',     password: '1234', role: 'usuario',    codigoEstudiante: 'EST-001', institucion: 'IE San José' },
  { id: 3, name: 'Luis',    email: 'luis@email.com',    password: '1234', role: 'orientador', institucion: 'IE San José' },
  { id: 4, name: 'Maria',   email: 'maria@email.com',   password: '1234', role: 'profesor',   institucion: 'IE San José' },
  { id: 5, name: 'Carlos',  email: 'carlos@email.com',  password: '1234', role: 'padre',      codigoVinculo: 'EST-001' },
];

// ─── Encuesta simulada ────────────────────────────────────────
const encuesta = [
  {
    id: 1,
    pregunta: '¿Cuál actividad disfrutas más en clase?',
    opciones: ['Resolver problemas matemáticos', 'Escribir cuentos o ensayos', 'Hacer experimentos', 'Trabajar en equipo'],
    correcta: 0,
    feedback: { bien: 'Tienes perfil analítico, áreas STEM podrían ser tu camino.', mal: 'Considera explorar más actividades lógico-matemáticas.' },
  },
  {
    id: 2,
    pregunta: '¿Cómo prefieres aprender algo nuevo?',
    opciones: ['Leyendo y tomando notas', 'Viendo videos y ejemplos', 'Practicando directamente', 'Escuchando a alguien explicar'],
    correcta: 2,
    feedback: { bien: 'Aprendes haciendo — perfil práctico muy valorado en ingeniería y tecnología.', mal: 'Un estilo más práctico puede abrirte muchas puertas.' },
  },
  {
    id: 3,
    pregunta: '¿Qué tipo de problema te motiva más resolver?',
    opciones: ['Ayudar a personas en dificultades', 'Diseñar algo nuevo y creativo', 'Analizar datos y encontrar patrones', 'Organizar y liderar equipos'],
    correcta: 2,
    feedback: { bien: 'Perfil analítico-investigativo, ideal para ciencias o tecnología.', mal: 'Trabajar con datos puede potenciar mucho tu vocación.' },
  },
];

// ─── Tendencias laborales simuladas ──────────────────────────
// sector: clasificación económica amplia (CIIU Colombia)
// clasificacion: subcategoría descriptiva dentro del sector
const tendenciasLaborales = [
  {
    area: 'Tecnología e IA',
    sector: 'Secundario / Terciario',
    clasificacion: 'Información y comunicaciones (CIIU J)',
    demanda: 95,
    crecimiento: '+40% en 5 años',
    salarioBase: '$3.500.000',
  },
  {
    area: 'Salud y Medicina',
    sector: 'Terciario',
    clasificacion: 'Actividades de atención de la salud humana (CIIU Q)',
    demanda: 88,
    crecimiento: '+25% en 5 años',
    salarioBase: '$4.200.000',
  },
  {
    area: 'Energías Renovables',
    sector: 'Secundario',
    clasificacion: 'Suministro de electricidad, gas y agua (CIIU D)',
    demanda: 82,
    crecimiento: '+55% en 5 años',
    salarioBase: '$3.100.000',
  },
  {
    area: 'Educación',
    sector: 'Terciario',
    clasificacion: 'Enseñanza y formación académica (CIIU P)',
    demanda: 74,
    crecimiento: '+10% en 5 años',
    salarioBase: '$2.400.000',
  },
  {
    area: 'Finanzas y Economía',
    sector: 'Terciario',
    clasificacion: 'Actividades financieras y de seguros (CIIU K)',
    demanda: 79,
    crecimiento: '+18% en 5 años',
    salarioBase: '$3.800.000',
  },
  {
    area: 'Diseño y Creatividad',
    sector: 'Terciario',
    clasificacion: 'Actividades artísticas y entretenimiento (CIIU R)',
    demanda: 70,
    crecimiento: '+22% en 5 años',
    salarioBase: '$2.800.000',
  },
];

// ─── Resultados de encuesta por estudiante ────────────────────
let resultadosEncuesta = {};
// estructura: { [codigoEstudiante]: { fecha, puntaje, total, respuestas: [...] } }

const guardarResultado = (codigo, datos) => {
  resultadosEncuesta[codigo] = datos;
};
const obtenerResultado = (codigo) => resultadosEncuesta[codigo] || null;

// ─── CRUD usuarios ────────────────────────────────────────────
const getAll      = ()      => users;
const getById     = (id)    => users.find((u) => u.id === id);
const getByEmail  = (email) => users.find((u) => u.email === email);

const getEstudianteByCode = (codigo) =>
  users.find((u) => u.role === 'usuario' && u.codigoEstudiante === codigo);

const create = (data) => {
  const newUser = { id: Date.now(), ...data };
  users.push(newUser);
  return newUser;
};
const update = (id, data) => {
  const i = users.findIndex((u) => u.id === id);
  if (i === -1) return null;
  users[i] = { ...users[i], ...data };
  return users[i];
};
const remove = (id) => {
  const i = users.findIndex((u) => u.id === id);
  if (i === -1) return null;
  return users.splice(i, 1)[0];
};

module.exports = {
  getAll, getById, getByEmail, getEstudianteByCode,
  create, update, remove,
  encuesta, tendenciasLaborales,
  guardarResultado, obtenerResultado,
};
