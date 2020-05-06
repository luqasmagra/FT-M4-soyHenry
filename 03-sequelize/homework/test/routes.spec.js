const supertest = require('supertest');
const app = require('../index.js');
const { Page, User } = require('../models');
const expect = require('chai').expect;

const agent = supertest(app);

describe('pedidos http WIKI', function () {
  beforeEach(function(){
    return Page.sync({ force: true })
  })
  describe('GET /', function () {
    it('responde con 200', function() {
      return agent.get('/')
      .expect(200);
    });
  });

  describe('GET /wiki/add', function () {
    it('responde con 200', function(){
      return agent.get('/wiki/add')
        .expect(200);
    });
    it('espera que sea html', function(){
      return agent.get('/wiki/add')
        .expect('Content-Type', /html/);
    });
  });

  describe('GET /wiki/:urlTitle', function () {
    it('responde con 404 cuando la página no existe', function() {
      return agent.get('/wiki/noexiste')
        .expect(404);
    });
    it('responde con 200 cuando la página existe', function() {
      return Page.create({
        title: 'hola',
        content: 'hola',
      })
      .then(() => {
        return agent.get('/wiki/hola')
          .expect(200);
      })
    });
  });

  describe('POST /wiki', function () {
    it('responde con 302', function(){
      return agent.post('/wiki')
        .send({
          title: 'hola',
          content: 'chau',
          authorEmail: 'toni@toni.com',
          authorName: 'Franco',
        })
        .expect(302);
    });
    it('crea una page en la base de datos', function(){
      return agent.post('/wiki')
        .send({
          title: 'hola',
          content: 'chau',
          authorEmail: 'toni@toni.com',
          authorName: 'Franco',
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
