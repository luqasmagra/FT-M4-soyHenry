var models = require('./models');
const {db} = require('./models')
var app = require('./index.js');

const force = true;
db.sync({ force })
    .then(function () {
        app.listen(3001, function () {
            console.log('Server is listening on port 3001!');
        });
    });

