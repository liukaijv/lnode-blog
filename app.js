var config = require('./config');

// app
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var bytes = require('bytes');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var swig = require('swig');
var cors = require('cors');

var config   = require('./config');
var routes = require('./routes/index');
var api = require('./routes/backend');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(busboy({
  limits: {
    fileSize: bytes(config.file_limit)
  }
}));

app.use(session({
    secret: config.session_secret, 
    resave: true,
    saveUninitialized: true,   
    store: new MongoStore({ url: config.db})
}));

app.use('/', routes);
app.use('/api', cors(), api);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;