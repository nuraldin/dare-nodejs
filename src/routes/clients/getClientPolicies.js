import services from "../../services/index.js";

const getClientPolicies = async (req, res, next) => {
  try {
    let user = req.user;
    let cache = req.app.locals.cache;

    let clients = await getClients(cache);
    let client = clients.find( clients => clients.id == req.params.id);
    if (!client) res.status(404).send({
      code: '404',
      message: 'Client not found'
    });
    
    if ( !user.isAdmin ) {
      if ( client.name !== user.name ) {
        res.status(403).send({
          code: '403',
          message: 'Forbidden: you are not authorized to access this resource'
        });
      }
    }
    
    let policies = await getPolicies(cache);
    let client_policies = policies.filter( policies => policies.clientId == client.id );
    client_policies = client_policies.map( policy => {
      return {
        id: policy.id,
        amountInsured: policy.amountInsured,
        email: policy.email,
        inceptionDate: policy.inceptionDate,
        installmentPayment: policy.installmentPayment
      };
    })
    res.send(client_policies);
  } catch (e) {
    return next(e);
  }
}

export default getClientPolicies;