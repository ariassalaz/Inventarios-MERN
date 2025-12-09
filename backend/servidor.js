const express = require('express');
const dotenv = require('dotenv').config();
const dbConexion = require('./conexion/dbConexion');
const { errorHandler } = require('./middleware/errorMiddleware');

const puerto = process.env.PUERTO || 5000;

dbConexion();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/usuarios', require('./rutas/rutasUsuarios'));     // registro / login
app.use('/api/productos', require('./rutas/rutasProductos'));   // catálogo + inventario
app.use('/api/ventas', require('./rutas/rutasVentas'));         // compras / órdenes

app.get('/health', (req, res) => {
  res.status(200).json({
    ok: true,
    mensaje: 'API Inventarios-MERN funcionando correctamente',
  });
});

app.use(errorHandler);

app.listen(puerto, () => {
  console.log(`Servidor Inventarios-MERN escuchando en http://localhost:${puerto}`);
});
