const mongoose = require('mongoose');

const dbConexion = async () => {
  try {
    const conexion = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB conectado: ${conexion.connection.host}`);
  } catch (error) {
    console.error(`Error al conectar a MongoDB: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = dbConexion;