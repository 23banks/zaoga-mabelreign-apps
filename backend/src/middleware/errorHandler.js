const errorHandler = (err, req, res, next) => {
  const timestamp = new Date().toISOString();

  console.error(`[${timestamp}] ${req.method} ${req.path}`);
  console.error('Error:', err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
      path: req.path,
      method: req.method,
      timestamp,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

module.exports = errorHandler;
