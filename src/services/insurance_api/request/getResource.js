import axios from 'axios';

import auth from '../../auth/index.js';

const getResource = async ( endpoint, resource, cache ) => {
  let accessToken;
  try {
    accessToken = await auth.getToken(cache);
  } catch(e) {
    throw new Error(`getToken failed: ${e.message}`);
  }
  
  let headers = {
    'Authorization': `Bearer ${ accessToken }`
  }  

  if ( cache[resource]?.etag ) {
    headers['If-None-Match'] = cache[resource]?.etag;
  }

  let res;
  try {
    res = await axios.get(endpoint, { headers: headers });
  } catch(e) {
    if ( e.response.status == 304 ) {
      console.log(`Using ${resource} cache...`);
      return cache[resource].data;
    }
  }

  console.log(`Refreshing ${resource} cache...`);
  if ( !cache[resource] ) cache[resource] = {};
  cache[resource].etag = res.headers.etag;
  cache[resource].data = res.data;
  return cache[resource].data;
};

export default getResource;