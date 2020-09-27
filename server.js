// jshint esversion: 6
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
const MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var omdb = require('./config/api.js');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fetch = require('node-fetch');
var configDB = require('./config/database.js');
var db;

mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err);
  db = database;
  require('./app/routes.js')(app, passport, db, fetch, omdb);
});

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(session({
  secret: 'rcbootcamp2019a',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.listen(port);
console.log('The magic happens on port ' + port);
