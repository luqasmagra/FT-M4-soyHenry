const { Sequelize, DataTypes } = require('sequelize');
const modelPlayer = require('./Models/Player.js');
const modelTeam = require('./Models/Team.js');

// Connection URI
const sequelize = new Sequelize('postgres://franco:12345@localhost:5432/demo', {
  // logging: (...msg) => console.log(msg)
  logging: false
});

modelPlayer(sequelize);
modelTeam(sequelize);

module.exports = {
  ...sequelize.models,
  db: sequelize
}