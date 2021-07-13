import axios from 'axios';

import { getToken } from '../auth/getToken.js';

const getClients = async () => {
  let token = await getToken();
  console.log(token);

  let response = await axios.get('https://dare-nodejs-assessment.herokuapp.com/api/clients', {
    headers: {
      'Authorization': `Bearer ${ token }`
    }
  });

  console.log(response);
  return response.data;
};

export { 
  getClients 
};