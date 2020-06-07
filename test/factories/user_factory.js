const faker = require('faker');
const { User } = require('../../app/models');

const data = async (props = {}) => {
  const defaultProps = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  return { ...defaultProps, ...props };
};

module.exports = async (props = {}) => {
  const userData = await data(props);
  const user = new User(userData);
  user.setPassword(userData.password);
  await user.save();
  return user;
}
