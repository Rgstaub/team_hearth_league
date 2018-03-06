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
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    bnetId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    pwResetToken: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    pwTokenExpiration: {
      type: DataTypes.INTEGER,
      allowNull: true
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