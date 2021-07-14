import getResource from './request/getResource.js';

const getPolicies = async ( cache ) => {
  let policies = await getResource('https://dare-nodejs-assessment.herokuapp.com/api/policies', 'policies', cache);
  return policies;
};

export default getPolicies;