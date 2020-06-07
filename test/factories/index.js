const userFactory = require('./user_factory');
const { generateTokenJWT } = require('../../app/auth');

const login = (user) => {
  return `Bearer ${generateTokenJWT(user)}`
};  

module.exports = { userFactory, login };
