'use strict'

module.exports = function(sequelize, DataTypes) {
  const users = sequelize.define('users', {

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
  return users;
}