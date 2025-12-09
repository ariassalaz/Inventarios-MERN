const mongoose = require('mongoose');

const esquemaUsuario = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
    },

    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      match: [
        /^\S+@\S+\.\S+$/,
        'Por favor ingresa un email válido',
      ],
    },

    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
    },

    rol: {
      type: String,
      enum: ['cliente', 'admin'],
      default: 'cliente',
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Usuario', esquemaUsuario);
