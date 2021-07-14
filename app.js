import express from 'express';
import dotenv from 'dotenv';

import loginRouter from './src/routes/login.js';
import policiesRouter from './src/routes/policies.js';
import clientsRouter from './src/routes/clients.js';

import authenticateToken from './src/services/auth/authenticateToken.js';
import MemoryCache from './src/utils/MemoryCache.js';
import errorHandler from './src/services/error.js';

const app = express();
const port = 8000;

app.use(express.json());
dotenv.config();
app.locals.cache = new MemoryCache();

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/login', loginRouter);
app.use('/policies', authenticateToken, policiesRouter);
app.use('/clients', authenticateToken, clientsRouter);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Basic server listening at http://localhost:${port}`);
});

export default server;