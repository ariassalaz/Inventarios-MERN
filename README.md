# Inventarios-MERN
Página web de sistema de gestión de inventarios y ventas utilizando la pila MERN (MongoDB, ExpressJS, ReactJS y NodeJS).
El proyecto simula una tienda de ropa con stock por talla, carrito de compras y roles de usuario (Admin o Cliente).


FUNCIONALIDADES PRINCIPALES
CLIENTE
-Visualización de productos
-Filtrado por categoría (Hombre / Mujer)
-Búsqueda de productos
-Selección de talla
-Carrito de compras
-Validación de stock:
  No se pueden agregar más productos de los disponibles
  No se permiten cantidades negativas
-Cálculo automático del total
-Proceso de compra (registro de venta)

ADMINISTRADOR
-Inicio de sesión con rol admin
-Acceso al panel de inventarios
-Visualización de productos y stock
-Control de inventario en tiempo real
-Actualización automática del stock al realizar una venta



TECNOLOGÍAS UTILIZADAS
BACKEND
Node.js
Express.js
MongoDB
JWT
bcryptjs
express-async-handler

FRONTEND
ReactJS
Redux Toolkit
React Router DOM
CSS
Fetch API



INSTALACIÓN Y EJECUCIÓN
1. Clonar repositorio
   git clone https://github.com/tu-usuario/Inventarios-MERN.git
   cd Inventarios-MERN

2. BACKEND
   cd backend
   npm run dev

3. FRONTEND
   cd frontend
   npm start


MEJORAS FUTURAS
- Agregar más categorías de productos
- Implementación de registro de usuario en página web
- Implementación de sistema de pago
