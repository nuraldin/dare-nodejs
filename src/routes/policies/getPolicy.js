import getClients from '../../services/insurance_api/getClients.js';
import getPolicies from '../../services/insurance_api/getPolicies.js';

const getPolicy = async (req, res, next) => {
  try {
    let user = req.user;
    let cache = req.app.locals.cache;
    
    let policies = await getPolicies(cache);
    let policy = policies.find( policy => policy.id == req.params.id);
    if ( !policy ) res.status(404).end();
    
    if ( !user.isAdmin ) {
      let clients = await getClients(cache);
      let clientId = clients.find(client => client.name === user.name)['id'];
      if ( policy.clientId !== clientId ) {
        res.status(403).send({
          code: 403,
          message: 'Forbidden: cannot access protected resource'
        });
      }
    }

    delete policy.clientId;
    res.send(policy);
  } catch(e) {
    return next(e);
  }
};


export default getPolicy;
