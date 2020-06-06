const express = require('express');

const router = express.Router();
const { verifyTokenJWT } = require('../auth');
const UserController = require('../controllers/user_controller');

router.use(verifyTokenJWT);

router.get('/', async (req, res) => {
  await UserController.list(req, res);
});

router.post('/', async (req, res) => {
  await UserController.create(req, res);
});

router.put('/:id', async (req, res) => {
  await UserController.update(req, res);
});

router.delete('/:id', async (req, res) => {
  await UserController.destroy(req, res);
});

router.get('/:id', async (req, res) => {
  await UserController.show(req, res);
});

module.exports = router;
