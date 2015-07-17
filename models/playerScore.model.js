var mongoose = require('mongoose');

var PlayerScore = mongoose.Schema ({
	name: String,
	kills: Number,
	deaths: Number,
	assists: Number,
	creeps: Number,
});

module.exports = mongoose.model('PlayerScore', PlayerScore);
module.exports.schema = PlayerScore;