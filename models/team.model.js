var mongoose = require('mongoose');

var Team = mongoose.Schema ({
	name: String,
	region: String,
});

module.exports.schema = Team;
module.exports = mongoose.model('Team', Team);