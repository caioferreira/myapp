const UserService = require('../services/user_service');

const RegisterController = {
  create: async (req, res) => {
    const user = await UserService.create(req.body);
    res.json(user);
  },
};

module.exports = RegisterController;
