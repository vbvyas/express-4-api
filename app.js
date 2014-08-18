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
var router = express.Router();

// test route
router.get('/', function (req, res) {
  res.json({ message: 'App is running.' });
});

// other routes
app.use('/api', router);

// start server
app.listen(port);
console.log('Server started on port:', port);
