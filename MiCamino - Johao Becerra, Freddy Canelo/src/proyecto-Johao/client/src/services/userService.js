import axios from 'axios';

const BASE = '/api/users';

export const getUsers    = ()         => axios.get(BASE);
export const getUserById = (id)       => axios.get(`${BASE}/${id}`);
export const createUser  = (data)     => axios.post(BASE, data);
export const updateUser  = (id, data) => axios.put(`${BASE}/${id}`, data);
export const deleteUser  = (id)       => axios.delete(`${BASE}/${id}`);
