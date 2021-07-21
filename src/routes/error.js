function errorHandler(err, req, res, next) {
  if ( err?.response?.status) res.status(err.response.status).send(`${err.response.data.error}:${err.response.data.message}`);
  else res.end();
}

export default errorHandler;