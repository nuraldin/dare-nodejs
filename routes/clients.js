import express from 'express';

import { getClients } from '../services/clients/getClients.js';

const router = express.Router();

/* GET the list of clients details paginated and limited to 10 elements by default. */
router.get('/', async (req, res, next) => {
  let clients = await getClients();
  res.send(clients);
});

/* GET the client's details */
router.get('/:id', (req, res, next) => {
  res.send(`client with id#${req.params?.id}`);
});

/* GET the client's policies */
router.get('/:id/policies', (req, res, next) => {
  res.send(`policies related to client with id#${req.params?.id}`);
});

export default router;