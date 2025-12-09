const express = require('express');
const router = express.Router();

const {
  crearVenta,
  obtenerVentas,
  obtenerMisVentas,
} = require('../controladores/controladorVentas');

const { proteger } = require('../middleware/authMiddleware');

router.post('/', proteger, crearVenta);

router.get('/mias', proteger, obtenerMisVentas);

router.get('/', proteger, obtenerVentas);

module.exports = router;
