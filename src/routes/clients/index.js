import express from 'express';

import getAllClients from './getAllClients.js';
import getClient from './getClient.js';
import getClientPolicies from './getClientPolicies.js';

const router = express.Router();

router.get('/', getAllClients);
router.get('/:id', getClient);
router.get('/:id/policies', getClientPolicies);

export default router;