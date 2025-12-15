const express = require('express');
const router = express.Router();

const {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require('../controladores/controladorProductos');

const { proteger } = require('../middleware/authMiddleware');

router.get('/', obtenerProductos);
router.get('/:id', obtenerProducto);

router.post('/', proteger, crearProducto);
router.put('/:id', proteger, actualizarProducto);
router.delete('/:id', proteger, eliminarProducto);

module.exports = router;