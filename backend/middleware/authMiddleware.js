const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Usuario = require('../modelos/ModeloUsuario');

const proteger = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRETO);

      req.usuario = await Usuario.findById(decoded.id).select('-password');

      if (!req.usuario) {
        res.status(401);
        throw new Error('Usuario no encontrado');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Token no válido');
    }
  } else {
    res.status(401);
    throw new Error('No estás autorizado, falta token');
  }
});

module.exports = {
  proteger,
};
