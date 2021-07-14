import axios from 'axios';

import getToken from '../auth/getToken.js';

const getClients = async ( cache ) => {
  let token = await getToken(cache);

  let headers = {
    'Authorization': `Bearer ${ token }`
  }  

  if ( cache?.clientsEtag ) {
    headers['If-None-Match'] = cache.clientsEtag;
  }

  let response;
  try {
    response = await axios.get('https://dare-nodejs-assessment.herokuapp.com/api/clients', { headers: headers } );
  } catch (e) {
    if ( e.response.status == 304 ) {
      console.log('Using clients cache...');
      return cache.clients;
    }
  }

  console.log('Refreshing clients cache...');
  cache.clientsEtag = response.headers.etag;
  cache.clients = response.data;
  return cache.clients;
};

export default getClients;