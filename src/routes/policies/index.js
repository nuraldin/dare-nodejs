import express from 'express';

import getAllPolicies from './getAllPolicies.js';
import getPolicy from './getPolicy.js';

const router = express.Router();

router.get('/', getAllPolicies);
router.get('/:id', getPolicy);

export default router;