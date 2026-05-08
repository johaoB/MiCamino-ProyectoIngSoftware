import axios from 'axios';

const BASE = '/api/encuesta';

export const getPreguntas  = ()              => axios.get(BASE);
export const submitEncuesta = (data)         => axios.post(`${BASE}/submit`, data);
export const getResultado   = (codigo)       => axios.get(`${BASE}/resultado/${codigo}`);
export const getTendencias  = ()             => axios.get(`${BASE}/tendencias`);
