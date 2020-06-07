const UserService = require('../services/user_service');

const UserController = {
  show: async (req, res) => {
    const { id } = req.params;
    const user = await UserService.findById(id);

    res.json(user);
  },

  list: async (req, res) => {
    const users = await UserService.findAll();
    res.json(users);
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    const user = await UserService.findById(id);

    user.destroy();
    res.json(user);
  },

  create: async (req, res) => {
    const user = await UserService.create(req.body);
    res.status(201).json(user);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const user = await UserService.update(id, req.body);

    res.json(user);
  },
};

module.exports = UserController;
