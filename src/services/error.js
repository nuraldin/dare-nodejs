function errorHandler (err, req, res, next) {
  res.status(err.response.status).send(`${err.response.data.error}:${err.response.data.message}`);
}

export default errorHandler;