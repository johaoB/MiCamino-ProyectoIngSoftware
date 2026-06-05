import axios from 'axios';

export const getEstudiante = (codigoVinculo) =>
  axios.get(`/api/padre/estudiante/${codigoVinculo}`);
