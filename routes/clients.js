import express from 'express';

import getClients from '../services/insurance_api/getClients.js';
import getPolicies from '../services/insurance_api/getPolicies.js';

import Pagination from '../utils/Pagination.js';

const router = express.Router();

/* GET the list of clients details paginated and limited to 10 elements by default. */
router.get('/', async (req, res, next) => {
  let user = req.user;
  let cache = req.app.locals.cache;

  // optional name parameter
  let name = (req.query?.name) ? req.query.name : null;

  // assets
  let clients = await getClients(cache);
  let policies = await getPolicies(cache);
 
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
});

/* GET the client's details */
router.get('/:id', async (req, res, next) => {
  let user = req.user;
  let cache = req.app.locals.cache;

  let clients = await getClients(cache);
  let client = clients.find( clients => clients.id == req.params.id);
  if (!client) res.status(404).send({
    code: 404,
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
      inceptionDate: policy.inceptionDate,
    };
  })

  client.policies = client_policies;
  res.send(client);
});

/* GET the client's policies */
router.get('/:id/policies', async (req, res, next) => {
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
});

export default router;