import axios from 'axios';

import * as local_config from '../../local_config/insurance_api_config.js'

const getToken = async () => {
  let res = await axios.post('https://dare-nodejs-assessment.herokuapp.com/api/login', {
    client_id: local_config.client_id,
    client_secret: local_config.client_secret
  }, {
    headers: {
      'accept': 'application/json'
    }
  });
  return res.data.token;
};

export default getToken;