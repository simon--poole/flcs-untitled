var mongoose = require('mongoose');

var PlayerScore = mongoose.Schema ({
	name: String,
	kills: Number,
	deaths: Number,
	assists: Number,
	creeps: Number,
	triples: Number,
	quadras: Number,
	pentas: Number,
});

PlayerScore.virtual('points').get(function(){
	var p = 0;
	p += this.kills * 2;
	p -= this.deaths * 0.5;
	p += this.assists * 1.5;
	p += this.creeps * 0.01;
	p += this.pentas * 10;
	p += this.quadras * 5;
	p += this. triples * 2;
	if(this.kills > 10 || this.assists > 10)
		p += 2;
	return p;
});

module.exports = mongoose.model('PlayerScore', PlayerScore);
module.exports.schema = PlayerScore;