import express from 'express';

import getClients from '../services/clients/getClients.js';
import getPolicies from '../services/policies/getPolicies.js';

const router = express.Router();

/* GET the list of clients details paginated and limited to 10 elements by default. */
router.get('/', async (req, res, next) => {
  let user = req.user;

  // optional name parameter
  let name = (req.query?.name) ? req.query.name : null;

  // assets
  let clients = await getClients();
  let policies = await getPolicies();
 
  let policies_hash = {};
  policies.forEach(policy => {
    let client_id = policy.clientId;

    delete policy.email;
    delete policy.clientId;
    delete policy.installmentPayment;

    if (!policies_hash[client_id]) {
      policies_hash[client_id] = [ policy ];
    } else {
      policies_hash[client_id].push(policy);
    }
  });

  clients.forEach( client => {
    client.policies = policies_hash[client.id] ? policies_hash[client.id]: [];
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

  // fetch assets
  let clients = await getClients();
  let policies = await getPolicies();

  let client = clients.find( clients => clients.id == req.params.id);
  if (!client) res.status(404).end();

  let client_policies = policies.filter( policies => policies.clientId == client.id );
  client_policies.forEach(client_policy => {
    delete client_policy.email;
    delete client_policy.clientId;
    delete client_policy.installmentPayment;
  })

  client.policies = client_policies;
  res.send(client);
});

/* GET the client's policies */
router.get('/:id/policies', async (req, res, next) => {
  let user = req.user;

  // fetch users
  let clients = await getClients();
  let policies = await getPolicies();

  let client = clients.find( clients => clients.id == req.params.id);
  if (!client) res.status(404).end();

  let client_policies = policies.filter( policies => policies.clientId == client.id );
  client_policies.forEach(client_policy => delete client_policy.clientId );

  res.send(client_policies);
});

export default router;