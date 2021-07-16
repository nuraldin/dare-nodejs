import getResource from './request/getResource.js';

const getPolicies = async ( cache ) => {
  let policies = await getResource(`${process.env.INSURANCE_API_BASE_URL}/api/policies`, 'policies', cache);
  return policies;
};

export default getPolicies;