import express from 'express';

import policiesRouter from './routes/policies.js';
import clientsRouter from './routes/clients.js';

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
