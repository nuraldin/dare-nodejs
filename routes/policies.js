const express = require('express');
const router = express.Router();

/* GET the list of a policies' client paginated and limited to 10 elements by default. */
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'test get policies endpoint',
    payload: 'payload'
  });
});

/* GET the details of a policy's client */
router.get('/:id', (req, res, next) => {
  res.send(`test get clients from policy id#${req.params?.id}`);
});

module.exports = router;