'use strict'

module.exports = function(sequelize, DataTypes) {
  const games = sequelize.define('games', {

    gameName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numPlayers: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false
    },
    winningPlayer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    currentTurn: {
      type: DataTypes.INTEGER
    }

  })

  // games.associate = function(models) {
  //   games.hasMany(models.players, {});
  // };

  return games;
}