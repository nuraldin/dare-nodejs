import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if ( !token ) {
    res.status(403).send({
      code: 403,
      message: 'Forbidden: no token provided'
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (e) {
    res.status(403).send({
      code: 403,
      message: 'Forbidden: token verification error'
    });
  }

  req.user = {
    name: decoded.username,
    isAdmin: decoded.admin
  };

  next();
}

export default authenticateToken;