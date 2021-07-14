import express from 'express';

import getClients from '../services/insurance_api/getClients.js';
import getPolicies from '../services/insurance_api/getPolicies.js';

import Pagination from '../utils/Pagination.js';

const router = express.Router();

/* GET the list of a policies' client paginated and limited to 10 elements by default. */
router.get('/', async (req, res, next) => {
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
});

/* GET the details of a policy's client */
router.get('/:id', async (req, res, next) => {
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
});

export default router;