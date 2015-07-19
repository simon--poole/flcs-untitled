var User = require('./../models/user.model');

module.exports.editUser = function(req, res, next, callback){
	User.findById(req.body.uid, function(err, user){
		User.find({'username': req.body.username}, function(err, checkUser){
			if(checkUser.length != 0)
				callback({'message': 'Username already taken', field: 'username'}, user);
			else {
				user.username = req.body.username;
				user.priv = req.body.privilege;
				if(req.body.change_password == 1){
					console.log("change password to: "+req.body.password);
					user.setPassword(req.body.password, function(err){
						if(err) callback(err, user);
						user.save(function(err){
							if(err) callback(err, user);
							else	callback(null);
						});
					});
				}
				else {
					user.save(function(err){
						if(err) callback(err, user);
						else	callback(null);
					});
				}
			}
		});
		
	});
}