var Sequelize = require('sequelize');
const S = Sequelize;
var db = new Sequelize('postgres://localhost:5432/henryblog', {
  logging: false,
});

const Page = db.define('page', {
  // Tu código acá:
  
});

//  .addHook() method

const User = db.define('users', {
 
})

// Vincular User con Page
// Tu código acá:


module.exports = {
  User,
  Page,
  db
}
