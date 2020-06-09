const { validationResult } = require('express-validator');
const { ErrorHandler } = require('./error');

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  throw new ErrorHandler(422, 'error', errors.array());
};

module.exports = { validate };
