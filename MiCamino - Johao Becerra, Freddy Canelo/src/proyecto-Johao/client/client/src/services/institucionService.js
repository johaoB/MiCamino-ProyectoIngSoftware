import axios from 'axios';

export const getEstudiantesByInst = (institucion) =>
  axios.get(`/api/institucion/estudiantes/${encodeURIComponent(institucion)}`);
