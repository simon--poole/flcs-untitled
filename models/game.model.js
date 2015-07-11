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
		name: String,
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
		name: String,
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

Game.pre('save', function(){
	var now = new Date();
	this.importDate = now;
	next();
});

module.exports = mongoose.model('Game', Game);