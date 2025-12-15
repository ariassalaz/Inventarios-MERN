const express = require('express');
const router = express.Router();

const {
  resumenVentas,
  reporteVentasCSV,
  resumenInventario,
  reporteInventarioCSV,
} = require('../controladores/controladorReportes');

const { proteger } = require('../middleware/authMiddleware');

router.get('/ventas/resumen', proteger, resumenVentas);
router.get('/ventas/csv', proteger, reporteVentasCSV);

router.get('/inventario/resumen', proteger, resumenInventario);
router.get('/inventario/csv', proteger, reporteInventarioCSV);

module.exports = router;