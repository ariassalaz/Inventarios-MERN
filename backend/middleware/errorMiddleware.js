const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const codigoEstado = res.statusCode ? res.statusCode : 500;

  res.status(codigoEstado).json({
    mensaje: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = {
  errorHandler,
};
