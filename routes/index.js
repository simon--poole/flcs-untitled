var router = require('express').Router();
var schemas = require('./../lib/schemas');
var passport = require('passport');
var localStrat = require('passport-local').Strategy;

passport.use(new localStrat(
  function(username, password, done) {
      if (username != "Simon" || username != "sman75")
        return done(null, false, { message: 'Incorrect username or password.' });
      return done(null, user);
  }
));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Standard games view */
router.get('/games', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Standard league view */
router.get('/games/:league', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Standard games view */
router.get('/games/:league/:week', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* Management area */
router.get('/manage/*', passport.authenticate('local', {failureRedirect : '/manage' }), function(req, res, next) {
	res.render('index', { title: 'Express' });
});
router.get('/manage', function(req, res, next) {
	res.render('login', { title: 'Express' });
});
router.post('/login',passport.authenticate('local', {successRedirect: '/manage/index', failureRedirect : '/manage' }));

module.exports = router;
