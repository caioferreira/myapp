const Sequelize = require('sequelize');
const crypto = require('crypto');

class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        salt: DataTypes.STRING,
      },
      {
        tableName: 'users',
        sequelize,
      },
    );
  }

  setPassword(password) {
    this.salt = crypto.randomBytes(16).toString('hex');

    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  }

  validPassword(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.password === hash;
  }

  toJSON() {
    const values = { ...this.get() };

    delete values.password;
    delete values.salt;
    return values;
  }
}

module.exports = User;
