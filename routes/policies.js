import express from 'express';

const router = express.Router();

/* GET the list of a policies' client paginated and limited to 10 elements by default. */
router.get('/', async (req, res, next) => {
  // TODO: me falta agarrar las de un cliente especifico 

  // pagination params
  let limit = (req.query?.limit) ? req.query.limit : 10;
  let page = (req.query?.page) ? req.query.page : 1;

  // assets
  let policies = await getPolicies();
 
  let policies_page;
  if ( policies.length > limit ) {
    policies_page = clients.slice((page - 1) * limit, page  * limit );
  } else {
    policies_page = clients;
  }

  res.send({
    page_number: page,
    pages: Math.ceil(clients.length / limit),
    total_items: policies.length,
    items_count: policies_page.length,
    items: policies_page
  });
});

/* GET the details of a policy's client */
router.get('/:id', async (req, res, next) => {
  // TODO: me falta agarrar las de un cliente especifico 
  
  let policies = await getPolicies();

  let policy = policies.find( policy => policy.id == req.params.id);
  if (!policy) res.status(404).end();

  res.send(policy);
});

export default router;