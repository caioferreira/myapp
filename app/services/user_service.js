const { User } = require('../models');
const { ErrorHandler } = require('../helpers/error');

const UserService = {
  findById: async (id) => {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new ErrorHandler(404, 'user.not.found');

    return user;
  },

  create: async (params) => {
    const user = new User(params);
    user.setPassword(params.password);
    await user.save();
    return user;
  },

  findAll: () => User.findAll(),

  update: async (id, params) => {
    await User.update(params, { where: { id } });
    return UserService.findById(id);
  },
};

module.exports = UserService;
