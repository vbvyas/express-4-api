// dependencies
var express = require('express');
var app = express();
var parser = require('body-parser');

// configure app to use body parser
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// set port
var port = process.env.PORT || 3000;


// API routes


// start server
app.listen(port);
console.log('Server started on port:', port);
