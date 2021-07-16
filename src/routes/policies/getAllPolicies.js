import getClients from '../../services/insurance_api/getClients.js';
import getPolicies from '../../services/insurance_api/getPolicies.js';

import Pagination from '../../utils/Pagination.js';

const getAllPolicies = async (req, res, next) => {
  try {
    let user = req.user;
    let cache = req.app.locals.cache;
    
    let policies = await getPolicies(cache);

    if ( !user.isAdmin ) {
      let clients = await getClients(cache);
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
