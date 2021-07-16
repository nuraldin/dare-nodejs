import getResource from './request/getResource.js';

const getClients = async ( cache ) => {
  let policies = await getResource(`${process.env.INSURANCE_API_BASE_URL}/api/clients`, 'clients', cache);
  return policies;
};

export default getClients;