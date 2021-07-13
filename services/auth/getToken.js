import axios from 'axios';

import * as local_config from '../../local_config/insurance_api_config.js'

const getToken = async () => {
  console.log(local_config);
  let res = await axios.post('https://dare-nodejs-assessment.herokuapp.com/api/login', {
    client_id: local_config.client_id,
    client_secret: local_config.client_secret
  }, {
    headers: {
      'accept': 'application/json'
    }
  });
  console.log(res.data);
  return res.data.token;
};

export {
  getToken
};