import jwt from 'jsonwebtoken';

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}

export default generateAccessToken;
