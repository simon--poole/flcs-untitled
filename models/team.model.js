var mongoose = require('mongoose');

var Team = mongoose.Schema ({
	name: String,
	acronym: String,
	region: String,
	description: String,
});

module.exports.schema = Team;
module.exports = mongoose.model('Team', Team);