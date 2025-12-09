// modelos/ModeloVenta.js
const mongoose = require('mongoose');

const esquemaItemVenta = mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true,
    },
    nombreProducto: {
      type: String,
      required: true,
    },
    talla: {
      type: String,
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1,
    },
    precioUnitario: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const esquemaVenta = mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: false, 
    },
    items: {
      type: [esquemaItemVenta],
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    metodoPago: {
      type: String,
      required: true, 
    },
    pagoSimulado: {
      type: Boolean,
      default: true,
    },
    estado: {
      type: String,
      default: 'pagado', 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Venta', esquemaVenta);
