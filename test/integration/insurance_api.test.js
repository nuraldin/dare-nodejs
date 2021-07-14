import chai from 'chai';
import axios from 'axios';

const assert = chai.assert;

describe('integration with insurance api', () => {
  it('should return 401 unauthorized if sent wrong credentials', async () => {
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

  it('should return 200 and acces token if sent correct credentials', async () => {
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