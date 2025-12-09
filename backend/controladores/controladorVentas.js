const asyncHandler = require('express-async-handler');
const Venta = require('../modelos/ModeloVenta');
const Producto = require('../modelos/ModeloProducto');

const crearVenta = asyncHandler(async (req, res) => {
  const { items, metodoPago } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error('Se requiere al menos un producto en la venta');
  }

  if (!metodoPago) {
    res.status(400);
    throw new Error('El método de pago es requerido');
  }

  const itemsVenta = [];
  let total = 0;

  for (const item of items) {
    const { productoId, talla, cantidad } = item;

    if (!productoId || !talla || !cantidad) {
      res.status(400);
      throw new Error('Cada item debe tener productoId, talla y cantidad');
    }

    const producto = await Producto.findById(productoId);

    if (!producto || !producto.activo) {
      res.status(400);
      throw new Error('Producto no disponible');
    }

    const tallaEncontrada = producto.tallas.find(t => t.talla === talla);

    if (!tallaEncontrada || tallaEncontrada.stock < cantidad) {
      res.status(400);
      throw new Error(
        `Stock insuficiente para "${producto.nombre}" en talla ${talla}`
      );
    }

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

  for (const item of items) {
    const { productoId, talla, cantidad } = item;
    const producto = await Producto.findById(productoId);

    const tallaEncontrada = producto.tallas.find(t => t.talla === talla);
    tallaEncontrada.stock -= cantidad;
    await producto.save();
  }

  const venta = await Venta.create({
    usuario: req.usuario ? req.usuario.id : null, 
    items: itemsVenta,
    total,
    metodoPago,
    pagoSimulado: true,
    estado: 'pagado',
  });

  res.status(201).json(venta);
});

const obtenerVentas = asyncHandler(async (req, res) => {
  const ventas = await Venta.find().populate('usuario', 'nombre email');
  res.status(200).json(ventas);
});

const obtenerMisVentas = asyncHandler(async (req, res) => {
  if (!req.usuario || !req.usuario.id) {
    res.status(401);
    throw new Error('No autorizado');
  }

  const ventas = await Venta.find({ usuario: req.usuario.id });
  res.status(200).json(ventas);
});

module.exports = {
  crearVenta,
  obtenerVentas,
  obtenerMisVentas,
};
