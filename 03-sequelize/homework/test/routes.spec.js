const supertest = require('supertest');
const app = require('../index.js');
const { Page, User,  Category } = require('../models');
const expect = require('chai').expect;

const agent = supertest(app);

describe('pedidos http PAGES', function () {
  before(function(){
    var catAutos =  Category.create({
      name: "Autos",
      description: "Categoria que habla sobre autos"
    });

    var catDeportes =  Category.create({
      name: "Deportes",
      description: "Categoria que habla sobre Deportes"
    });

    var catVideojuegos =  Category.create({
      name: "Videojuegos",
      description: "Categoria que habla sobre Videojuegos"
    });

    Promise.all([catAutos, catDeportes, catVideojuegos])
      .then(res => {
        return "Categorías precargadas";
      })
  })
  beforeEach(function(){
    return Page.sync({ force: true })
  })
  describe('GET /', function () {
    it('responde con 200', function() {
      return agent.get('/')
      .expect(200);
    });
  });

  describe('GET /pages/add', function () {
    it('responde con 200', function(){
      return agent.get('/pages/add')
        .expect(200);
    });
    it('espera que sea html', function(){
      return agent.get('/pages/add')
        .expect('Content-Type', /html/);
    });
  });

  describe('GET /pages/:urlTitle', function () {
    it('responde con 404 cuando la página no existe', function() {
      return agent.get('/pages/noexiste')
        .expect(404);
    });
    it('responde con 200 cuando la página existe', function() {
      return Page.create({
        title: 'hola',
        content: 'hola',
      })
      .then(() => {
        return agent.get('/pages/hola')
          .expect(200);
      })
    });
  });

  describe('POST /pages', function () {
    it('responde con 302', function(){
      return agent.post('/pages')
        .send({
          title: 'hola',
          content: 'chau',
          authorEmail: 'toni@toni.com',
          authorName: 'Franco',
          categories: [1]
        })
        .expect(302);
    });
    it('crea una page en la base de datos', function(){
      return agent.post('/pages')
        .send({
          title: 'hola',
          content: 'chau',
          authorEmail: 'toni@toni.com',
          authorName: 'Franco',
          categories: [1]
        })
        .then(() => {
          return Page.findOne({
            where: {
              title: 'hola'
            }
          });
        })
        .then(page => {
          expect(page).to.exist;
        });
    });
    it('setea correctamente la categoría en la base de datos', function(){
      return agent.post('/pages')
        .send({
          title: 'hola',
          content: 'chau',
          authorEmail: 'toni@toni.com',
          authorName: 'Franco',
          categories: [1,2]
        })
        .then(() => {
          return Page.findOne({
            where: {
              title: 'hola'
            },
            include: {
              model: Category
            }
          });
        })
        .then(page => {
          expect(page.categories[0].name).to.equal('Autos');
          expect(page.categories[1].name).to.equal('Deportes');
        });
    });
  });

});


describe('pedidos http USER', function () {
  beforeEach(function(){
    return User.sync({ force: true })
  })
  describe('GET /users', function () {
    it('responde con 200', function() {
      return agent.get('/users')
      .expect(200);
    });
  });

  describe('GET /users', function () {
    it('responde con 200', function() {
      return User.create({
        name: 'hola',
        email: 'hola@hola.com',
      })
      .then(() => {
        return agent.get('/users')
          .expect(200);
      })
    });
  });

  describe('GET /users/:id', function () {
    it('responde con 200', function() {
      return User.create({
        name: 'hola',
        email: 'hola@hola.com',
      })
      .then(() => {
        return agent.get('/users/1')
          .expect(200);
      })
    });
  });

});
