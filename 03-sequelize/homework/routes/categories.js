const { Page, Category } = require('../models');
const router = require('express').Router();

router.get('/', function(req, res) {
  // Modificar para devolver los datos de todas las categorias existentes
  // Tu código acá:

});

router.get('/:idCategory', function(req, res) {
  // Modificar para que cuando se seleccione una "Category" en particular se muestren
  // todas las páginas que estén dentro de dicha categoría
  // Tu código acá:

});

module.exports = router;
