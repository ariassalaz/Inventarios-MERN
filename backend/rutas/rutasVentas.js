const express = require('express');
const router = express.Router();

const {
  crearVenta,
  obtenerVentas,
  obtenerVenta,
} = require('../controladores/controladorVentas');

const { proteger } = require('../middleware/authMiddleware');

router.post('/', proteger, crearVenta);

router.get('/', proteger, obtenerVentas);

router.get('/:id', proteger, obtenerVenta);

module.exports = router;
