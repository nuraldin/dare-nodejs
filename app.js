const express = require('express');

const policiesRouter = require('./routes/policies');
const clientsRouter = require('./routes/clients');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/policies', policiesRouter);
app.use('/clients', clientsRouter);

app.listen(port, () => {
  console.log(`Basic server listening at http://localhost:${port}`);
});
