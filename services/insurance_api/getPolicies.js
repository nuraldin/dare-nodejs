import axios from 'axios';

import getToken from '../auth/getToken.js';

const getPolicies = async ( cache ) => {
  let token = await getToken(cache);

  let headers = {
    'Authorization': `Bearer ${ token }`
  }  

  if ( cache?.policiesEtag ) {
    headers['If-None-Match'] = cache.policiesEtag;
  }

  let response;
  try {
    response = await axios.get('https://dare-nodejs-assessment.herokuapp.com/api/policies', { headers: headers });
  } catch(e) {
    if ( e.response.status == 304 ) {
      console.log('Using policies cache...');
      return cache.policies;
    }
  }

  console.log('Refreshing policies cache...');
  cache.policiesEtag = response.headers.etag;
  cache.policies = response.data;
  return cache.policies;
};

export default getPolicies;