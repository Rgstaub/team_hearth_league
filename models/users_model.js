'use strict'

module.exports = function(sequelize, DataTypes) {
  const users = sequelize.define('users', {

    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    battleNetId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })


  return users;
}