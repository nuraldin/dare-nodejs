import express from 'express';
import dotenv from 'dotenv';

import routes from "./src/routes/index.js";
import services from './src/services/index.js';

import MemoryCache from './src/utils/MemoryCache.js';

dotenv.config();
const server_port = process.env.LOCAL_SERVER_PORT;

const app = express();

app.use(express.json());
app.locals.cache = new MemoryCache();

app.use('/login', routes.login);
app.use('/policies', services.auth.authenticateToken, routes.policies);
app.use('/clients', services.auth.authenticateToken, routes.clients);
app.use(routes.errorHandler);


const server = app.listen(server_port, () => {
  console.log(`Basic server listening at http://localhost:${server_port}`);
});

export default server;