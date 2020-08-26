var Sequelize = require('sequelize');
const S = Sequelize;
var db = new Sequelize('postgres://usuario:password@localhost:5432/henryblog', {
  logging: false,
});

const Page = db.define('page', {
  // Tu código acá:

});

// .addHook() method

const User = db.define('users', {

});

const Category = db.define('category', {
  // Tu código acá:

});

// Vincular User con Page
// Tu código acá:


module.exports = {
  User,
  Page,
  Category,
  db
}
