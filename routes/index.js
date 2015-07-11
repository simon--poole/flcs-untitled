var router = require('express').Router();
var db = require('./../lib/database');
var Admin = require('./../lib/auth');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Standard games view */
router.get('/games', function(req, res, next) {
  res.render('games', { title: 'Express' });
});

/* Standard league view */
router.get('/games/:league', function(req, res, next) {
  res.render('games', { title: 'Express' });
});

/* Standard games view */
router.get('/games/:league/:week', function(req, res, next) {
  res.render('games', { title: 'Express' });
});

/* About page */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

/* Contact page */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

/* Users */


router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/manage');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/register', function(req, res, next){
	res.render('register', { });
});

router.post('/register', function(req, res) {
    Admin.register(new Admin({ username : req.body.username, priv: 0}), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/manage');
        });
    });
});


/* Management area */
router.get('/manage', function(req, res, next){
	res.render('manage/games', { title: 'Express' });
});

router.get('/manage/admins', function(req, res, next){
	db.listAdmins(function(admins){
		res.render('manage/admins', {data: admins, priv: req.user.priv });
	});
	
});
router.get('/manage/admins/delete/:id', function(req, res, next){
	db.deleteAdmin(req.params.id, function(){
		res.redirect('/manage/admins');
	});
});
router.get('/manage/:action', function(req, res, next) {
	res.render('manage/'+req.params.action, { title: 'Express' });
});
	

	


module.exports = router;
