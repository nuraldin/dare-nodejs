import axios from 'axios';
import jwt from 'jsonwebtoken';

import * as local_config from '../../../../local_config/insurance_api_config.js'

const getToken = async ( cache ) => {

  if ( cache?.token ) {
    let decoded = jwt.decode(cache.token);
    if ( Date.now() < decoded.exp * 1000 ) {
      return cache.token;
    }
  }

  let res = await axios.post(`${process.env.INSURANCE_API_BASE_URL}/api/login`, {
    client_id: local_config.clientId,
    client_secret: local_config.clientSecret
  }, {
    headers: {
      'accept': 'application/json'
    }
  });

  cache.token = res.data.token;
  return res.data.token;
};

export default getToken;