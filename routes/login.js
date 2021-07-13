import express from 'express';

import generateAccessToken from '../services/auth/generateAccessToken.js';

const router = express.Router();

const mockUsers = [
  {
    name: 'Britney',
    password: 'pass',
    role: 'admin'
  }, 
  {
    name: 'Barnett',
    password: 'pass',
    role: 'user'
  }
];

/* POST user details, authenticate and login */
router.post('/', (req, res, next) => {
  let user = mockUsers.find( user => user.name === req.body.username && user.password === req.body.password );
  
  if (!user) {
    res.status(401).send({
      code: 401,
      message: "User not found or wrong password"
    })
  }

  let exp = Math.floor(Date.now() / 1000) + (3600 * 48);
  const token = generateAccessToken({ 
    username: user.name, 
    exp: exp,
    admin: user.role === 'admin' ? true : false   
  });
  
  res.send({
    token: token,
    type: "Bearer",
    expires_in: `${exp}`
  })
});

export default router;