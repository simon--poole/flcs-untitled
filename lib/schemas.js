var mongoose = require('mongoose');

var adminSchema = mongoose.Schema ({
	username: String,
	password: String,
	priv: Number,
});

var playerSchema = mongoose.Schema ({
	name: String,
	points: Number
});

var gameSchema = mongoose.Schema ({
	week: Number,
	day: Number,
	league: String,
	played: Boolean,
	datePlayed: Date,
	redTeam:  	{
		name: String,
		top: [playerSchema],
		mid: [playerSchema],
		adc: [playerSchema],
		support: [playerSchema],
		jungler: [playerSchema]
	},
	blueTeam: {
		name: String,
		top: [playerSchema],
		mid: [playerSchema],
		adc: [playerSchema],
		support: [playerSchema],
		jungler: [playerSchema]
	},
	
	importDate: Date,
});

gameSchema.pre('save', function(){
	var now = new Date();
	this.importDate = now;
	next();
});


module.exports.Game = gameSchema;
module.exports.Player = playerSchema;
module.exports.Admin = adminSchema;
