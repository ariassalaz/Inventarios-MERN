const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../modelos/ModeloUsuario');

const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETO, {
    expiresIn: '30d',
  });
};

const registrarUsuario = asyncHandler(async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  if (!nombre || !email || !password) {
    res.status(400);
    throw new Error('Por favor llena todos los campos requeridos');
  }

  const usuarioExiste = await Usuario.findOne({ email });

  if (usuarioExiste) {
    res.status(400);
    throw new Error('Ya existe un usuario con ese email');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const usuario = await Usuario.create({
    nombre,
    email,
    password: passwordHash,
    rol: rol || 'cliente',
  });

  res.status(201).json({
    _id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
    token: generarToken(usuario.id),
  });
});

const loginUsuario = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    res.status(400);
    throw new Error('Credenciales inválidas');
  }

  const coincidePassword = await bcrypt.compare(password, usuario.password);

  if (!coincidePassword) {
    res.status(400);
    throw new Error('Credenciales inválidas');
  }

  res.status(200).json({
    _id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
    token: generarToken(usuario.id),
  });
});

const obtenerUsuario = asyncHandler(async (req, res) => {
  const usuario = await Usuario.findById(req.usuario.id).select('-password');

  res.status(200).json(usuario);
});

module.exports = {
  registrarUsuario,
  loginUsuario,
  obtenerUsuario,
};
