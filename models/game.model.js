var mongoose = require('mongoose');

var Player = mongoose.Schema ({
	name: String,
	kills: Number,
	deaths: Number,
	assists: Number,
	creeps: Number,
});

var Game = mongoose.Schema ({
	week: Number,
	day: Number,
	league: String,
	played: Boolean,
	datePlayed: Date,
	redTeam:  	{
		team: String,
		top: [Player],
		mid: [Player],
		adc: [Player],
		support: [Player],
		jungler: [Player],
		towers: Number,
		dragons: Number,
		barons: Number
	},
	blueTeam: {
		team: String,
		top: [Player],
		mid: [Player],
		adc: [Player],
		support: [Player],
		jungler: [Player],
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

Game.virtual('matchTitle').get(function () {
  return this.league + " W"+this.week + "D"+this.day + " - " + this.redTeam.team + " vs " + this.blueTeam.team;
});

module.exports = mongoose.model('Game', Game);