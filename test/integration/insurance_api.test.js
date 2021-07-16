import chai from 'chai';
import spies from 'chai-spies';
import axios from 'axios';

const assert = chai.assert;
chai.use(spies);

describe('integration with insurance api', () => {
  afterEach(() => {
    chai.spy.restore();
  });

  it('should return 401 unauthorized if sent wrong credentials', async () => {
    chai.spy.on(axios, 'post', () => {
      return Promise.reject({ response: { status: 401 }});
    });

    try {
      await axios.post('https://dare-nodejs-assessment.herokuapp.com/api/login', {
        client_id: 'der',
        client_secret: 'sercet'
      }, {
        headers: {
          'accept': 'application/json'
        }
      });
      assert.fail(`sent wrong credentials but still api answered ok`);
    } catch(e) {
      assert.equal(e.response.status, 401);
    }
  });

  it('should return 200 and access token if sent correct credentials', async () => {
    chai.spy.on(axios, 'post', () => {
      return Promise.resolve({ 
          status: 200,
          data: {
            token: 'token'
          } 
        }
      );
    });
    
    try {
      let response = await axios.post('https://dare-nodejs-assessment.herokuapp.com/api/login', {
        client_id: 'dare',
        client_secret: 's3cr3t'
      }, {
        timeout: 4000,
        headers: {
          'accept': 'application/json'
        }
      });
      assert.equal(response.status, 200);
      assert.isNotNull(response.data);
      assert.isNotNull(response.data.token);
    } catch(e) {
      assert.fail(`sent wrong credentials but still api answered ok`);
    }
  });
});