const express = require('express');
const router = express.Router();

const {
  registrarUsuario,
  loginUsuario,
  obtenerUsuario,
} = require('../controladores/controladorUsuarios');

const { proteger } = require('../middleware/authMiddleware');

router.post('/', registrarUsuario);       // Registro
router.post('/login', loginUsuario);      // Login

router.get('/yo', proteger, obtenerUsuario); // Datos del usuario actual

module.exports = router;