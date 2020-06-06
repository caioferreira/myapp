'use strict';
const { User } = require('../../app/models')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return User.create({name: 'Caio Ferreira', email: 'caio.ferreira@redspark.io', password: '1234'})
  },

  down: (queryInterface, Sequelize) => {
    return User.destroy({ truncate: true })
  }
};

