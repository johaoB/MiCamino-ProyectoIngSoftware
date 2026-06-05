import axios from 'axios';
const BASE = '/api/admin';

export const getPendientes            = ()                      => axios.get(`${BASE}/pendientes`);
export const aprobarUsuario           = (id)                    => axios.put(`${BASE}/aprobar/${id}`);
export const denegarUsuario           = (id)                    => axios.put(`${BASE}/denegar/${id}`);
export const getEstudiantes           = ()                      => axios.get(`${BASE}/estudiantes`);
export const getPadres                = ()                      => axios.get(`${BASE}/padres`);
export const vincularPadreEstudiante  = (idPadre, idEstudiante) => axios.post(`${BASE}/vincular`, { idPadre, idEstudiante });
