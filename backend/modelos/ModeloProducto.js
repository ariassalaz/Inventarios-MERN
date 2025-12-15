const mongoose = require('mongoose');

const esquemaTalla = mongoose.Schema(
  {
    talla: { type: String, required: true },    
    stock: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const esquemaProducto = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es requerido'],
    },
    categoria: {
      type: String,
      required: [true, 'La categoría es requerida'], 
    },
    precio: {
      type: Number,
      required: [true, 'El precio es requerido'],
    },
    descripcion: {
      type: String,
    },
    imagenes: [
      {
        type: String, 
      },
    ],
    tallas: {
      type: [esquemaTalla],
      default: [],
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Producto', esquemaProducto);