const express = require('express');

const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../helpers/validation');
const LoginController = require('../controllers/login_controller');

const loginValidator = () => [
  body('email').normalizeEmail().isEmail(),
  body('password').trim().notEmpty(),
];

router.post('/', loginValidator(), validate, async (req, res) => {
  await LoginController.login(req, res);
});

module.exports = router;
