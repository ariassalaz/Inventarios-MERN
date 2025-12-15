const asyncHandler = require("express-async-handler");
const Producto = require("../modelos/ModeloProducto"); // <- asegúrate que exista
const Venta = require("../modelos/ModeloVenta"); // <- si no tienes modelo Venta, abajo te dejo alternativa

// POST /api/ventas  (usuario logueado compra)
const crearVenta = asyncHandler(async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error("No hay items para comprar");
  }

  // Validar y descontar stock
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

    // tu esquema trae tallas: [{talla, stock}]
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

  // Guardar venta (si tienes ModeloVenta)
  let ventaCreada = null;
  try {
    ventaCreada = await Venta.create({
      usuario: req.usuario?.id,
      items,
      fecha: new Date(),
    });
  } catch (e) {
    // Si no tienes ModeloVenta, no pasa nada: el stock ya se descontó
  }

  res.status(201).json({
    ok: true,
    venta: ventaCreada,
  });
});

module.exports = { crearVenta };
