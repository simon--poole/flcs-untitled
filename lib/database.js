var mongoose = require('mongoose');
var schemas = require('./schemas');

var Players = mongoose.model('Players', schemas.Player);
var Games = mongoose.model('Games', schemas.Game);
var Admins = mongoose.model('Admins', schemas.Admin);

module.exports.verifyLogin = function(username, password, callback){
	//var adminSchema = schemas.Admin;
	//var adminHandler = new mongoose.Model('Admin', adminSchema);
	callback(null, true);
}
module.exports.listAdmins = function(callback){
	Admins.find({},
				function(err, docs){
					if(err) next(err);
					else callback(docs);
			});
				
}
module.exports.deleteAdmin = function(id, callback){
	Admins.findById(id, function(err, doc){
		if(err) next(err);
		doc.remove();
		callback();
	});
}