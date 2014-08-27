// dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var low = require('lowdb');

// configure app to use body parser
// body parser with express-4 currently not working
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set port
var port = process.env.PORT || 3000;

// API routes
var router = express.Router();

// middleware for all requests
router.use(function (req, res, next) {
  console.log("Next...");
  next();
});

// test routes
router.route('/test')
  // POST http://localhost:3000/api/test
  .post(function (req, res) {
    console.log("body", req.body);
    low('test').insert({ name: req.body.name });
    res.json({ message: req.body.name });
  })

  // GET http://localhost:3000/api/test
  .get(function (req, res) {
    var data = low('test');
    res.json(data);
  });

// GET http://localhost:3000/api/test/:id
router.route('/test/:id')
  .get(function (req, res) {
    var data = low('test').where({ id: req.params.id });
    res.json(data);
  })

  .put(function (req, res) {
    var data = low('test').where({ id: req.params.id });
    low('test').update({ name: req.body.name });
    res.json({ message: 'Updated' });
  });

// test routes
router.get('/', function (req, res) {
  res.json({ message: 'App is running.' });
});

router.get('/ping', function (req, res) {
  res.json({ message: 'pong' });
});

// other routes
app.use('/api', router);

// start server
app.listen(port);
console.log('Server started on port:', port);
