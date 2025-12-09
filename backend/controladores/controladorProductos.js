const asyncHandler = require('express-async-handler');
const Producto = require('../modelos/ModeloProducto');

const obtenerProductos = asyncHandler(async (req, res) => {
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
    throw new Error('Nombre, categoría y precio son requeridos');
  }

  const producto = await Producto.create({
    nombre,
    categoria,
    precio,
    descripcion,
    imagenes: imagenes || [],
    tallas: tallas || [],
  });

  res.status(201).json(producto);
});


const actualizarProducto = asyncHandler(async (req, res) => {
  const producto = await Producto.findById(req.params.id);

  if (!producto) {
    res.status(404);
    throw new Error('Producto no encontrado');
  }

  const productoActualizado = await Producto.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(productoActualizado);
});

const eliminarProducto = asyncHandler(async (req, res) => {
  const producto = await Producto.findById(req.params.id);

  if (!producto) {
    res.status(404);
    throw new Error('Producto no encontrado');
  }

  producto.activo = false;
  await producto.save();

  res.status(200).json({ id: req.params.id, mensaje: 'Producto desactivado' });
});

const ajustarStock = asyncHandler(async (req, res) => {
  const { talla, cantidad } = req.body;

  if (!talla || typeof cantidad !== 'number') {
    res.status(400);
    throw new Error('Talla y cantidad son requeridos');
  }

  const producto = await Producto.findById(req.params.id);

  if (!producto) {
    res.status(404);
    throw new Error('Producto no encontrado');
  }

  const tallaEncontrada = producto.tallas.find(t => t.talla === talla);

  if (!tallaEncontrada) {
    if (cantidad < 0) {
      res.status(400);
      throw new Error('No existe esa talla para este producto');
    }
    producto.tallas.push({ talla, stock: cantidad });
  } else {
    tallaEncontrada.stock += cantidad;
    if (tallaEncontrada.stock < 0) {
      res.status(400);
      throw new Error('El stock no puede ser negativo');
    }
  }

  await producto.save();

  res.status(200).json(producto);
});

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  ajustarStock,
};
