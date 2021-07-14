import getResource from './request/getResource.js';

const getClients = async ( cache ) => {
  let policies = await getResource('https://dare-nodejs-assessment.herokuapp.com/api/clients', 'clients', cache);
  return policies;
};

export default getClients;