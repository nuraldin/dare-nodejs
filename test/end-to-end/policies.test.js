import request from 'supertest';

import app from '../../app.js';

describe('policies endpoint', () => {
  it('should return 401 if user does not exist', (done) => {
    request(app)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({ username: 'wrong', password: 'wrong'})
      .expect(401, done)
  });

  after( async () => {
    app.close();
  });
});