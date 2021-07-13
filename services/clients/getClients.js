import axios from 'axios';

import getToken from '../auth/getToken.js';

const getClients = async () => {
  let token = await getToken();

  let response = await axios.get('https://dare-nodejs-assessment.herokuapp.com/api/clients', {
    headers: {
      'Authorization': `Bearer ${ token }`
    }
  });

  return response.data;
};

export default getClients;