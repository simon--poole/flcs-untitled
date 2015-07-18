var router = require('express').Router();
var db = require('./controllers/database.controller');
var User = require('./models/user.model');
var Game = require('./models/game.model');
var Team = require('./models/team.model');
var Player = require('./models/player.model');
var PlayerScore = require('./models/playerScore.model');
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
router.get('/game/:team1/:team2/:week', function(req, res, next) {
  var testTeam = new Team({
	  "region": "NA",
	  "name": "TSM"
  });
  var testPlayer = new PlayerScore({
	  "name": "TheOddOne",
	  "kills": 1,
	  "deaths": 3,
	  "assists": 3,
	  "creeps": 7,
	  "pentas": 0,
	  "quadras": 0,
	  "triples": 0,
  });
  var date = new Date();
  var testGame = new Game({
	  "week": "6",
	  "day": "2",
	  "league": "nalcs",
	  "played": true,
	  "winner": true,
	  "length": 6605,
	  "datePlayed": date,
	  "redTeam": {
	  	"team": "TSM",
	    "top": testPlayer,
		"mid": testPlayer,
		"adc": testPlayer,
		"support": testPlayer,
		"jungler": testPlayer,
		"towers": 0,
		"dragons": 0,
		"barons": 0,
	   },
	  "blueTeam": {
	  	"team": "CLG",
	    "top": testPlayer,
		"mid": testPlayer,
		"adc": testPlayer,
		"support": testPlayer,
		"jungler": testPlayer,
		"towers": 0,
		"dragons": 0,
		"barons": 0,
	  },
	  "importDate": date,
  });
  res.render('games/game', { title: 'Express', page: 'games', relUrl: '../../../', game: testGame });
});

/* Teams
 * Location ./pages/teams
 */

// Team overview (standings)
router.get('/teams', function(req, res, next) {
  res.render('teams/overview', { title: 'Express', page: 'teams' });
});

router.get('/teams/:region', function(req, res, next) {
  res.render('teams/overview', { title: 'Express', page: 'teams', relUrl: '../' });
});

// Team spotlight
router.get('/team/:team', function(req, res, next) {
  var exampleTeam = new Team({ 
	  "name": "Team Solo Mid",
	  "acronym": "TSM",
	  "region": "na",
	  "description": "Praesent non mi nizzle maurizzle posuere bibendizzle. You son of a bizzle rizzle fo shizzle mah nizzle fo rizzle, mah home g-dizzle for sure. Cras izzle dawg mah nizzle leo sodalizzle fo shizzle. Fo shizzle gangsta, da bomb bizzle dapibus shizznit, nulla i'm in the shizzle sure metizzle, izzle yippiyo augue its fo rizzle in things. Vivamizzle go to hizzle fo shizzle bizzle fizzle. Away arcu funky fresh, fermentizzle black funky fresh, faucibus izzle, dope check out this, maurizzle. Sizzle vehicula laoreet shit. Fizzle brizzle its fo rizzle, fizzle et, crazy izzle, fo a, arcu. Morbi uhuh ... yih! placerizzle you son of a bizzle. Cool shizzle my nizzle crocodizzle eros id erat. Pot fo shizzle mah nizzle fo rizzle, mah home g-dizzle sizzle, egestizzle fo, accumsizzle quizzle, yo eget, neque. Nulla iaculizzle gangsta a orci tincidunt sodales. Fusce sagittis, nulla eget sollicitudizzle mah nizzle, lacizzle dope luctus erizzle, sizzle check out this augue purizzle black da bomb. Etiam lacus. Boofron sizzle mi. Dizzle black turpis. Fo break it down shizznit. Mofo turpis erizzle, yo mamma id, go to hizzle izzle, facilisis yo mamma, shut the shizzle up. Nunc tellizzle. Nulla funky fresh eros, tristique sit amet, shut the shizzle up yo, tincidunt nizzle, brizzle."
  });
	var testPlayer = new PlayerScore({
	  "name": "TheOddOne",
	  "kills": 1,
	  "deaths": 3,
	  "assists": 3,
	  "creeps": 7,
	  "pentas": 0,
	  "quadras": 0,
	  "triples": 0,
  });
  var testPlayerD = new Player({
	  "name": "TheOddOne",
	  "position": "Coach",
  });
  var date = new Date();
  var testGame = new Game({
	  "week": "6",
	  "day": "2",
	  "league": "nalcs",
	  "played": true,
	  "winner": true,
	  "length": 6605,
	  "datePlayed": date,
	  "redTeam": {
	  	"team": "TSM",
	    "top": testPlayer,
		"mid": testPlayer,
		"adc": testPlayer,
		"support": testPlayer,
		"jungler": testPlayer,
		"towers": 0,
		"dragons": 0,
		"barons": 0,
	   },
	  "blueTeam": {
	  	"team": "CLG",
	    "top": testPlayer,
		"mid": testPlayer,
		"adc": testPlayer,
		"support": testPlayer,
		"jungler": testPlayer,
		"towers": 0,
		"dragons": 0,
		"barons": 0,
	  },
	  "importDate": date,
  });
	var exampleGames = [testGame, testGame, testGame];
	var players = [testPlayerD, testPlayerD, testPlayerD, testPlayerD, testPlayerD, testPlayerD];
  res.render('teams/team', { title: 'Express', page: 'teams', relUrl: '../', team: exampleTeam, games: exampleGames, players: players });
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
