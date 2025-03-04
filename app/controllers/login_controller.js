const { User } = require('../models');
const { generateTokenJWT } = require('../auth');
const { ErrorHandler } = require('../helpers/error');

const LoginController = {
  login: async (req, res) => {
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (!user || !user.validPassword(req.body.password)) throw new ErrorHandler(401, 'authentication.problem');

    const token = generateTokenJWT(user);
    res.json({ token });
  },
};

module.exports = LoginController;
