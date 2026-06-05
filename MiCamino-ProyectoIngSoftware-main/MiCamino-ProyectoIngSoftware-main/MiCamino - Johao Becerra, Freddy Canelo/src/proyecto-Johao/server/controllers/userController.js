const UserModel = require('../models/userModel');

const getUsers = (req, res) => {
  res.json(UserModel.getAll());
};

const getUserById = (req, res) => {
  const user = UserModel.getById(Number(req.params.id));
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(user);
};

const createUser = (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email)
    return res.status(400).json({ message: 'name y email son requeridos' });
  const newUser = UserModel.create({ name, email, role: role || 'user' });
  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const updated = UserModel.update(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(updated);
};

const deleteUser = (req, res) => {
  const deleted = UserModel.remove(Number(req.params.id));
  if (!deleted) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json({ message: 'Usuario eliminado', user: deleted });
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
