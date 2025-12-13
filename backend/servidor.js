const express = require('express');
const dotenv = require('dotenv').config();
const dbConexion = require('./conexion/dbConexion');
const { errorHandler } = require('./middleware/errorMiddleware');

const puerto = process.env.PUERTO || 5000;

dbConexion();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/usuarios', require('./rutas/rutasUsuarios'));    
app.use('/api/productos', require('./rutas/rutasProductos'));   
app.use('/api/ventas', require('./rutas/rutasVentas'));         
app.use('/api/reportes', require('./rutas/rutasReportes'));

app.get('/health', (req, res) => {
  res.status(200).json({
    ok: true,
    mensaje: 'API Inventarios-MERN funcionando correctamente',
  });
});

app.use(errorHandler);

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://inventarios.rickit19.jcarlos19.com:${puerto}`);
});
