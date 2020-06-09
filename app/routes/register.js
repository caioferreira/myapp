const express = require('express');

const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../helpers/validation');
const RegisterController = require('../controllers/register_controller');
const UserService = require('../services/user_service');
const { ErrorHandler } = require('../helpers/error');

const registerValidator = () => [
  body('name').notEmpty(),
  body('email').normalizeEmail().isEmail().custom(async (value) => {
    const user = await UserService.findByEmail(value);
    if (user) {
      throw new ErrorHandler(422, 'E-mail already exist');
    }
  }),
  body('password').trim().notEmpty(),
  body('confirmPassword').exists()
    .custom(async (value, { req }) => {
      if (value !== req.body.password) {
        throw new ErrorHandler(422, 'Password confirmation is diferent');
      }
    }),
];

router.post('/', registerValidator(), validate, async (req, res) => {
  await RegisterController.create(req, res);
});

module.exports = router;
