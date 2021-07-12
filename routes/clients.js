const express = require('express');
const router = express.Router();

/* GET the list of clients details paginated and limited to 10 elements by default. */
router.get('/', (req, res, next) => {
  res.send('test list of clients');
});

/* GET the client's details */
router.get('/:id', (req, res, next) => {
  res.send(`client with id#${req.params?.id}`);
});

/* GET the client's policies */
router.get('/:id/policies', (req, res, next) => {
  res.send(`policies related to client with id#${req.params?.id}`);
});

module.exports = router;