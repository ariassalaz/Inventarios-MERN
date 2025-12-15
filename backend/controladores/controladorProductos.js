const asyncHandler = require('express-async-handler');
const Producto = require('../modelos/ModeloProducto');

const obtenerProductos = asyncHandler(async (req, res) => {
  //RETORNA PRODUCTOS ACTIVOS
  const productos = await Producto.find({ activo: true });
  res.status(200).json(productos);
});

const obtenerProducto = asyncHandler(async (req, res) => {
  const producto = await Producto.findById(req.params.id);

  if (!producto || !producto.activo) {
    res.status(404);
    throw new Error('Producto no encontrado');
  }

  res.status(200).json(producto);
});

const crearProducto = asyncHandler(async (req, res) => {
  const { nombre, categoria, precio, descripcion, imagenes, tallas } = req.body;

  if (!nombre || !categoria || !precio) {
    res.status(400);
    throw new Error('Nombre, categoría y precio son obligatorios');
  }

  //CREAR PRODUCTO EN BD
  const producto = await Producto.create({
    nombre,
    categoria,
    precio,
    descripcion: descripcion || '',
    imagenes: imagenes || [],
    tallas: tallas || [],
    activo: true
  });

  res.status(201).json(producto);
});

const actualizarProducto = asyncHandler(async (req, res) => {
  const producto = await Producto.findById(req.params.id);

  if (!producto) {
    res.status(404);
    throw new Error('Producto no encontrado');
  }

  const actualizado = await Producto.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(actualizado);
});

const eliminarProducto = asyncHandler(async (req, res) => {
  const producto = await Producto.findById(req.params.id);

  if (!producto) {
    res.status(404);
    throw new Error('Producto no encontrado');
  }

  //DESACTIVA PRODUCTO
  producto.activo = false;
  await producto.save();

  res.status(200).json({ mensaje: 'Producto desactivado' });
});

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};