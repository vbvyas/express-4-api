// dependencies
var express = require('express');
var app = express();
var parser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/testdb');
var Test = require('./app/models/test');

// configure app to use body parser
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

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
    var test = new Test();
    test.name = req.body.name;
    test.save(function (err) {
      if (err) res.send(err);
      res.json({ message: 'Model posted' });
  })

  // GET http://localhost:3000/api/test
  .get(function (req, res) {
    Test.find(function (err, data) {
      if (err) res.send(err);
      res.json(data);
    })
  })

  // GET http://localhost:3000/api/test/:id
  .get(function (req, res) {
    Test.findById(req.params.id, function (err, data) {
      if (err) res.send(err);
      res.json(data);
    })
  });

// test route
router.get('/', function (req, res) {
  res.json({ message: 'App is running.' });
});

// other routes
app.use('/api', router);

// start server
app.listen(port);
console.log('Server started on port:', port);
