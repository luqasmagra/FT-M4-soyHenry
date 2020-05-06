const express = require('express');
const bodyParser = require('body-parser');
const vb = require('volleyball');
const nunjucks = require('nunjucks');
const { wiki, users, index } = require('./routes');
const app = express();

const env = nunjucks.configure('views', {noCache: true});

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(vb);
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({extended: false}));
app.use('/', index);
app.use('/wiki', wiki);
app.use('/users', users);
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send(err.message);
});


module.exports = app;