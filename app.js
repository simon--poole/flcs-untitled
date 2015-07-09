/* Requirements */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

/* Initialise app */
var app = express();

/* Set app to development */
app.set('env', 'development');

/* View Engine setup */
app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'jade');
app.locals.pretty = true;


/* Favicon (current: /static/favicon.ico */
//app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

/* Logging */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(session({secret: 'flcsknifecat'}))
app.use(passport.initialize());
app.use(passport.session());

/* Routing file */
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
