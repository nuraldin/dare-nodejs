import express from 'express';
import request from 'supertest';
import dotenv from 'dotenv';

import loginRouter from '../../src/routes/login/index.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/login', loginRouter);

describe('policies endpoint', () => {
  let server;

  before(() => {
    server = app.listen(process.env.TEST_PORT, () => {});
  });

  it('should return 401 if user does not exist', (done) => {
    request(server)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({ username: 'wrong', password: 'wrong'})
      .expect(401, done)
  });

  after( async () => {
    server.close();
  });
});