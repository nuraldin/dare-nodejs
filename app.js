import express from 'express';
import dotenv from 'dotenv';

import loginRouter from './src/routes/login/index.js';
import policiesRouter from './src/routes/policies/index.js';
import clientsRouter from './src/routes/clients/index.js';

import authenticateToken from './src/services/auth/authenticateToken.js';
import MemoryCache from './src/utils/MemoryCache.js';
import errorHandler from './src/services/error.js';

dotenv.config();
const server_port = process.env.LOCAL_SERVER_PORT;

const app = express();

app.use(express.json());
app.locals.cache = new MemoryCache();

app.use('/login', loginRouter);
app.use('/policies', authenticateToken, policiesRouter);
app.use('/clients', authenticateToken, clientsRouter);
app.use(errorHandler);


const server = app.listen(server_port, () => {
  console.log(`Basic server listening at http://localhost:${server_port}`);
});

export default server;