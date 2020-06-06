const { User } = require('../models');
const { ErrorHandler } = require('../helpers/error');

const UserService = {
  findById: async (id) => {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new ErrorHandler(404, 'user.not.found');

    return user;
  },

  create: (params) => User.create(params),

  findAll: () => User.findAll(),
};

module.exports = UserService;
