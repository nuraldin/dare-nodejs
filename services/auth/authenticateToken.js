import jwt from 'jsonwebtoken';

function authenticateToken(req) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if ( !token ) return ;

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (e) {
    return;
  }

  return {
    name: decoded.username,
    isAdmin: decoded.admin
  };
}

export default authenticateToken;