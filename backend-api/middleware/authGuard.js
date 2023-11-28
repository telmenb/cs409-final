const jwt = require('jsonwebtoken');

function authGuard(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(400).send('Missing authorization token');
    return;
  }

  try {
    const tokenString = authorization.split(' ')[1];
    const username = jwt.verify(tokenString, process.env.ACCESS_TOKEN_SECRET);
    req.username = username;
    next();
  } catch {
    res.status(401).send('Unauthorized request');
  }
}

module.exports = authGuard;
