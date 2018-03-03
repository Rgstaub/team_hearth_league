'use strict'

const bycrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const uuid = require('uuid/v4');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('users', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    battlenetId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  // Overwrite toJSON() for users to ensure that passwords don't get returned
  User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }

  return User;
}