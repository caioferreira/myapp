const express = require('express');

const router = express.Router();
const LoginController = require('../controllers/login_controller');

router.post('/', async (req, res) => {
  await LoginController.login(req, res);
});

module.exports = router;
