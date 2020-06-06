const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../helpers/error');

const verifyTokenJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) throw new ErrorHandler(401, 'authorization.token.not.found');

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) throw new ErrorHandler(403, 'invalid.token');
    req.user = user;
    next();
  });
};

const generateTokenJWT = (user) => jwt.sign({ id: user.id, name: user.name }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });

module.exports = { verifyTokenJWT, generateTokenJWT };
