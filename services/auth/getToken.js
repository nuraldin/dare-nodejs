import axios from 'axios';
import jwt from 'jsonwebtoken';

import * as local_config from '../../local_config/insurance_api_config.js'

const getToken = async ( cache ) => {

  if ( cache?.token ) {
    let decoded = jwt.decode(cache.token);
    if ( Date.now() < decoded.exp * 1000 ) {
      return cache.token;
    }
  }

  let res = await axios.post('https://dare-nodejs-assessment.herokuapp.com/api/login', {
    client_id: local_config.client_id,
    client_secret: local_config.client_secret
  }, {
    headers: {
      'accept': 'application/json'
    }
  });

  cache.token = res.data.token;
  return res.data.token;
};

export default getToken;