const UserModel = require('../models/userModel');

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });

  const user = UserModel.getByEmail(email);

  if (!user || user.password !== password)
    return res.status(401).json({ message: 'Credenciales incorrectas' });

  // Devuelve el usuario sin la contraseña
  const { password: _, ...safeUser } = user;
  res.json({ message: 'Login exitoso', user: safeUser });
};

module.exports = { login };
