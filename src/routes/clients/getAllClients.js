
import services from '../../services/index.js';

import Pagination from '../../utils/Pagination.js';

const getAllClients = async (req, res, next) => {
  try {
    let user = req.user;
    let cache = req.app.locals.cache;

    // optional name parameter
    let name = (req.query?.name) ? req.query.name : null;

    // assets
    let clients = await services.insurance_api.getClients(cache);
    let policies = await services.insurance_api.getPolicies(cache);
  
    let policies_hash = {};
    policies.forEach( policy => {
      let client_id = policy.clientId;
      let pruned_policy = {
        id: policy.id,
        amountInsured: policy.amountInsured,
        inceptionDate: policy.inceptionDate
      };

      if (!policies_hash[client_id]) {
        policies_hash[client_id] = [ pruned_policy ];
      } else {
        policies_hash[client_id].push( pruned_policy );
      }
    });

    clients = clients.map( client => {
      client.policies = policies_hash[client.id] ? policies_hash[client.id]: [];
      return client;
    });

    if ( name ) {
      clients = [ clients.find( client => client.name === name ) ];
    }
  
    if ( !user.isAdmin ) {
      clients = clients.filter( client => client.name === name ); 
    }

    let pagination = new Pagination( clients, req.query?.limit );
    let page = pagination.getPage( req.query?.page )
    res.send(page);
  } catch (e) {
    return next(e);
  }
};

export default getAllClients;