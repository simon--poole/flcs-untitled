var mongoose = require('mongoose');
var PlayerScore = require('./playerScore.model').schema;

var Game = mongoose.Schema ({
	week: Number,
	day: Number,
	league: String,
	played: Boolean,
	winner: Boolean,
	datePlayed: Date,
	length: Number,//seconds
	redTeam:  	{
		team: String,
		top: [PlayerScore],
		mid: [PlayerScore],
		adc: [PlayerScore],
		support: [PlayerScore],
		jungler: [PlayerScore],
		towers: Number,
		dragons: Number,
		barons: Number
	},
	blueTeam: {
		team: String,
		top: [PlayerScore],
		mid: [PlayerScore],
		adc: [PlayerScore],
		support: [PlayerScore],
		jungler: [PlayerScore],
		towers: Number,
		dragons: Number,
		barons: Number
	},
	importDate: Date,
});

Game.pre('save', function(next, done){
	var now = new Date();
	this.importDate = now;
	next();
});


module.exports = mongoose.model('Game', Game);