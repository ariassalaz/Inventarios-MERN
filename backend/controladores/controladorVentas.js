const asyncHandler = require("express-async-handler");
const Producto = require("../modelos/ModeloProducto"); 
const Venta = require("../modelos/ModeloVenta"); 

const crearVenta = asyncHandler(async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error("No hay items para comprar");
  }

  for (const it of items) {
    const productoId = it.productoId || it._id;
    const talla = it.talla;
    const cantidad = Number(it.cantidad || 0);

    if (!productoId || !talla || cantidad <= 0) {
      res.status(400);
      throw new Error("Item inválido (productoId/talla/cantidad)");
    }

    const producto = await Producto.findById(productoId);
    if (!producto) {
      res.status(404);
      throw new Error(`Producto no encontrado: ${productoId}`);
    }

    const idx = (producto.tallas || []).findIndex((t) => t.talla === talla);
    if (idx === -1) {
      res.status(400);
      throw new Error(`La talla "${talla}" no existe en ${producto.nombre}`);
    }

    const stockActual = Number(producto.tallas[idx].stock || 0);
    if (stockActual < cantidad) {
      res.status(400);
      throw new Error(
        `Stock insuficiente en ${producto.nombre} talla ${talla}. Stock: ${stockActual}`
      );
    }

    producto.tallas[idx].stock = stockActual - cantidad;
    await producto.save();
  }

  let ventaCreada = null;
  try {
    ventaCreada = await Venta.create({
      usuario: req.usuario?.id,
      items,
      fecha: new Date(),
    });
  } catch (e) {
  }

  res.status(201).json({
    ok: true,
    venta: ventaCreada,
  });
});

module.exports = { crearVenta };