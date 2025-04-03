'use strict';

const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.stack}`);
  
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: {
      status,
      message
    }
  });
};

module.exports = errorHandler;