var mongoose = require('mongoose');
var Team = require('./team.model').schema;

var Player = mongoose.Schema ({
	name: String,
	team: [Team],
	position: String,
});