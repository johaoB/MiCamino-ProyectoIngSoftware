import axios from 'axios';
const BASE = '/api/encuesta';

export const getPreguntas    = ()               => axios.get(BASE);
export const submitEncuesta  = (data)           => axios.post(`${BASE}/submit`, data);
export const getResultado    = (idEstudiante)   => axios.get(`${BASE}/resultado/${idEstudiante}`);
export const getTendencias   = ()               => axios.get(`${BASE}/tendencias`);
export const guardarProgreso = (data)           => axios.post(`${BASE}/progreso`, data);
export const getProgreso     = (idEstudiante)   => axios.get(`${BASE}/progreso/${idEstudiante}`);
