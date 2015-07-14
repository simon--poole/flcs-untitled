var router = require('express').Router();
var db = require('./controllers/database.controller');
var User = require('./models/user.model');
var passport = require('passport');
var auth = require('connect-ensure-login').ensureLoggedIn;

/* Standard main pages
 * Located ./pages/
 */

// Cover Page
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('index', { title: 'Express', user: req.user });
});

// About Page
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express', page: 'about' });
});

// Contact Page
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express', page: 'contact' });
});


/* Standard tournament pages
 * Located ./pages/games
 */

// Games Overview
router.get('/games', function(req, res, next) {
  res.render('games/overview', { title: 'Express', page: 'games' });
});

// League Overview
router.get('/games/:league', function(req, res, next) {
  res.render('games/overview', { title: 'Express', page: 'games' });
});

// Week Overview
router.get('/games/:league/:week', function(req, res, next) {
  res.render('games/overview', { title: 'Express', page: 'games' });
});

// Specific game
router.get('/game/:team1/:team2', function(req, res, next) {
  res.render('games/game', { title: 'Express', page: 'games' });
});

/* Teams
 * Location ./pages/teams
 */

// Team overview (standings)
router.get('/teams', function(req, res, next) {
  res.render('teams/overview', { title: 'Express', page: 'teams' });
});

// Team spotlight
router.get('/teams/:team', function(req, res, next) {
  res.render('teams/spotlight', { title: 'Express', page: 'teams' });
});

	
/* Users
 * Located ./pages/users
 */

router.get('/login', function(req, res) {
    res.render('users/login', { user : req.user });
});

router.post('/login', function(req, res) {
    User.authenticate()(req.body.username, req.body.password, function (err, user, options) {
        if (err) return next(err);
        if (user === false) {
            res.render('users/login', { user : req.user, err: {message: "Incorrect username or password.", field: "both"} });
        } else {
            req.login(user, function (err) {
				var returnURL = req.session.returnTo || "/";
                res.redirect(returnURL);
            });
        }
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/register', function(req, res, next){
	res.render('users/register', {err: {message: "error message", field:"both"}});
});

router.post('/register', function(req, res) {
	User.register(new User({
        username: req.body.username,
		priv: 0
    }), req.body.password, function (err, user) {
        if (err) {
            res.render('users/register', {err: {message: err.message, field:"username"}});
        } else {
            res.redirect('/login');
        }
    });
});


/* Management area */
router.get('/manage', auth('/login'), function(req, res, next){
	res.render('manage/games', { title: 'Express' });
});

router.get('/manage/admins', auth('/login'), function(req, res, next){
	db.listAdmins(function(docs){
		res.render('manage/admins', {data: docs, user: req.user });
	});
	
});
router.get('/manage/admins/delete/:id', function(req, res, next){
	db.deleteAdmin(req.params.id, function(){
		res.redirect('/manage/admins');
	});
});	


module.exports = router;
