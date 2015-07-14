var mongoose = require('mongoose');
var Users = require('./../models/user.model');
var Games = require('./../models/game.model');

module.exports.listAdmins = function(callback){
	Users.find({},
				function(err, docs){
					if(err) next(err);
					else callback(docs);
			});
				
}
module.exports.deleteAdmin = function(id, callback){
	Users.findById(id, function(err, doc){
		if(err) next(err);
		doc.remove();
		callback();
	});
}