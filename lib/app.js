const http = require('http');

const cheese = require('../routes/cheese');


var app = http.createServer(cheese);

module.exports = app;
