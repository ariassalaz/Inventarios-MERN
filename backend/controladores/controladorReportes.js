const asyncHandler = require('express-async-handler');
const Venta = require('../modelos/ModeloVenta');
const Producto = require('../modelos/ModeloProducto');

const resumenVentas = asyncHandler(async (req, res) => {
  const ventas = await Venta.find();

  const numeroVentas = ventas.length;

  const totalVentas = ventas.reduce(
    (suma, v) => suma + (v.total || 0),
    0
  );

  res.status(200).json({
    numeroVentas,
    totalVentas,
    promedioPorVenta: numeroVentas > 0 ? totalVentas / numeroVentas : 0,
  });
});

const reporteVentasCSV = asyncHandler(async (req, res) => {
  const ventas = await Venta.find().sort({ createdAt: 1 });

  let csv = 'id,fecha,total\n';

  ventas.forEach((v) => {
    const fecha = v.createdAt ? v.createdAt.toISOString() : '';
    const total = v.total || 0; 
    csv += `${v._id},${fecha},${total}\n`;
  });

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="reporte_ventas.csv"'
  );

  res.status(200).send(csv);
});

const resumenInventario = asyncHandler(async (req, res) => {
  const productos = await Producto.find({ activo: true });

  const totalProductos = productos.length;

  const totalPiezas = productos.reduce((suma, p) => {
    const totalTallas = (p.tallas || []).reduce(
      (acu, t) => acu + (t.stock || 0),
      0
    );
    return suma + totalTallas;
  }, 0);

  res.status(200).json({
    totalProductos,
    totalPiezas,
  });
});

const reporteInventarioCSV = asyncHandler(async (req, res) => {
  const productos = await Producto.find({ activo: true }).sort({ nombre: 1 });

  let csv = 'id_producto,nombre,categoria,talla,stock\n';

  productos.forEach((p) => {
    if (!p.tallas || p.tallas.length === 0) {
      csv += `${p._id},${p.nombre},${p.categoria},,0\n`;
    } else {
      p.tallas.forEach((t) => {
        csv += `${p._id},${p.nombre},${p.categoria},${t.talla},${t.stock}\n`;
      });
    }
  });

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="reporte_inventario.csv"'
  );

  res.status(200).send(csv);
});

module.exports = {
  resumenVentas,
  reporteVentasCSV,
  resumenInventario,
  reporteInventarioCSV,
};
