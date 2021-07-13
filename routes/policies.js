import express from 'express';

import authenticateToken from '../services/auth/authenticateToken.js';
import getClients from '../services/clients/getClients.js';
import getPolicies from '../services/policies/getPolicies.js';

const router = express.Router();

/* GET the list of a policies' client paginated and limited to 10 elements by default. */
router.get('/', async (req, res, next) => {
  // authenticate
  const user = authenticateToken(req);

  if (!user) {
    res.status(403).send({
      code: 403,
      message: 'Forbidden: token authentication error'
    })
  }

  // pagination params
  let limit = (req.query?.limit) ? req.query.limit : 10;
  let page = (req.query?.page) ? req.query.page : 1;

  // assets
  let policies = await getPolicies();
 
  if ( !user.isAdmin ) {
    let clients = await getClients();
    let clientId = clients.find(client => client.name === user.name)['id'];
    policies = policies.filter(policy => policy.clientId === clientId );
  }

  policies.forEach( policy => {
    delete policy.clientId;
  });

  let policies_page;
  if ( policies.length > limit ) {
    policies_page = policies.slice((page - 1) * limit, page  * limit );
  } else {
    policies_page = policies;
  }

  res.send({
    page_number: page,
    pages: Math.ceil(policies.length / limit),
    total_items: policies.length,
    items_count: policies_page.length,
    items: policies_page
  });
});

/* GET the details of a policy's client */
router.get('/:id', async (req, res, next) => {
  const user = authenticateToken(req);

  if (!user) {
    res.status(403).send({
      code: 403,
      message: 'Forbidden: token authentication error'
    })
  }
  
  let policies = await getPolicies();
  let policy = policies.find( policy => policy.id == req.params.id);
  if ( !policy ) res.status(404).end();
  
  if ( !user.isAdmin ) {
    let clients = await getClients();
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
});

export default router;