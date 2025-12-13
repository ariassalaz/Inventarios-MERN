const asyncHandler = require('express-async-handler');
const Venta = require('../modelos/ModeloVenta');
const Producto = require('../modelos/ModeloProducto');


const obtenerVentas = asyncHandler(async (req, res) => {
  const ventas = await Venta.find({ usuario: req.usuario._id })
    .sort({ createdAt: -1 });

  res.status(200).json(ventas);
});

const obtenerVenta = asyncHandler(async (req, res) => {
  const venta = await Venta.findById(req.params.id);

  if (!venta) {
    res.status(404);
    throw new Error('Venta no encontrada');
  }

  if (venta.usuario.toString() !== req.usuario._id.toString()) {
    res.status(403);
    throw new Error('No tienes permiso para ver esta venta');
  }

  res.status(200).json(venta);
});

const crearVenta = asyncHandler(async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error('Debes enviar al menos un producto en la venta');
  }

  const itemsVenta = [];
  let total = 0;

  for (const item of items) {
    const { producto: idProducto, talla, cantidad } = item;

    if (!idProducto || !talla || !cantidad || cantidad <= 0) {
      res.status(400);
      throw new Error('Datos de producto, talla o cantidad inválidos en la venta');
    }

    const producto = await Producto.findById(idProducto);

    if (!producto || !producto.activo) {
      res.status(404);
      throw new Error(`Producto no encontrado o inactivo: ${idProducto}`);
    }

    const tallaObj = (producto.tallas || []).find(
      (t) => t.talla === talla
    );

    if (!tallaObj) {
      res.status(400);
      throw new Error(`La talla ${talla} no existe para el producto ${producto.nombre}`);
    }

    if (tallaObj.stock < cantidad) {
      res.status(400);
      throw new Error(
        `Stock insuficiente para ${producto.nombre} talla ${talla}. Disponible: ${tallaObj.stock}`
      );
    }

    tallaObj.stock -= cantidad;
    await producto.save();

    const precioUnitario = producto.precio;
    const subtotal = precioUnitario * cantidad;
    total += subtotal;

    itemsVenta.push({
      producto: producto._id,
      nombreProducto: producto.nombre,
      talla,
      cantidad,
      precioUnitario,
      subtotal,
    });
  }

  const venta = await Venta.create({
    usuario: req.usuario._id,
    items: itemsVenta,
    total,
  });

  res.status(201).json(venta);
});

module.exports = {
  obtenerVentas,
  obtenerVenta,
  crearVenta,
};
