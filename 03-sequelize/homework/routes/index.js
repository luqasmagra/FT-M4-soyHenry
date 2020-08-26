const router = require('express').Router();
const { Page } = require('../models');

router.get('/', function(req, res, next){
  // Modificar para renderizar todas las páginas creadas que se encuentren
  // dento de la base de datos (Debe traer también las categorías a las que pertenece cada página)
  // Tu código acá:

})

module.exports = {
  users: require('./users'),
  pages: require('./pages'),
  categories: require('./categories'),
  index: router,
};
