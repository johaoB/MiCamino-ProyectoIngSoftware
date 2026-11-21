import axios from 'axios';

// Busca el estudiante vinculado usando el id del padre logueado
export const getEstudiantePorPadre = (idPadre) =>
  axios.get(`/api/padre/vinculacion/${idPadre}`);
