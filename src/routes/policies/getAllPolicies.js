import services from '../../services/index.js';

import Pagination from '../../utils/Pagination.js';

const getAllPolicies = async (req, res, next) => {
  try {
    let user = req.user;
    let cache = req.app.locals.cache;
    
    let policies = await services.insurance_api.getPolicies(cache);

    if ( !user.isAdmin ) {
      let clients = await services.insurance_api.getClients(cache);
      let clientId = clients.find(client => client.name === user.name)['id'];
      policies = policies.filter(policy => policy.clientId === clientId );
    } 

    policies = policies.map( policy => {
      return {
        id: policy.id,
        amountInsured: policy.amountInsured,
        email: policy.email,
        inceptionDate: policy.inceptionDate,
        installmentPayment: policy.installmentPayment
      };
    })

    let pagination = new Pagination(policies, req.query?.limit );
    let page = pagination.getPage( req.query?.page )
    res.send(page);
  } catch(e) {
    return next(e);
  }
};

export default getAllPolicies;
