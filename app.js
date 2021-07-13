import express from 'express';
import dotenv from 'dotenv';

import loginRouter from './routes/login.js';
import policiesRouter from './routes/policies.js';
import clientsRouter from './routes/clients.js';

import authenticateToken from './services/auth/authenticateToken.js';

const app = express();
app.use(express.json());
const port = 8000;
dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/login', loginRouter);
app.use('/policies', authenticateToken, policiesRouter);
app.use('/clients', clientsRouter);

app.listen(port, () => {
  console.log(`Basic server listening at http://localhost:${port}`);
});
