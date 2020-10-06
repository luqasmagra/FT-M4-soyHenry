const router = require('express').Router();
const { Page, User } = require('../models');


router.post('/', function(req, res, next) {
  // Modificar para que cuando se clickee el botón de "SUBMIT" se cree un nuevo post
  // tomando los datos desde el form y agregándolo a la base de datos
  // (Debe incluir también la categoría a la/s cual/es pertenece)
  // Tu código acá:


});

router.get('/add', function(req, res) {
  res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next) {
  // Modificar para que cuando se seleccione un "Page" en particular se muestren
  // los datos asociados al mismo
  // Tu código acá:

});

module.exports = router;
