var privileges = [
	{
		"category": "Basic Users",
		"privs": [
			{
				"title": "Unconfirmed Email",
				"priv": 0,
			},
			{
				"title": "Registered User",
				"priv": 1,
			}],
	},
	{
		"category": "Moderator Positions",
		"privs": [
			{
				"title": "Results Editor",
				"priv": 10
			},
			{
				"title": "Content Editor",
				"priv": 11
			}],
	},
	{
		"category": "Administrator Positions",
		"privs": [
			{
				"title": "User Administrator",
				"priv": 20,
			},
			{
				"title": "Developer",
				"priv": 21,
			}]
	}
];

module.exports = function(privRequired){
	return function(req, res, next) {
		if (!req.isAuthenticated || !req.isAuthenticated()) {
			if (req.session) {
			  req.session.returnTo = req.originalUrl || req.url;
			}
		  return res.redirect('/login');
		}
		else if(req.user.priv >= privRequired)
			next();
		else {
			var err = new Error('Insufficient Permissions');
	  		err.status = 401;
	  		next(err);
		}
  	}
}
module.exports.privileges = privileges;
module.exports.checkPriv = function(req, res, next, privRequired, callback){
	if( typeof req.user !== undefined && req.user.priv >= privRequired)
		callback(req, res, next);
	else {
		var err = new Error('Insufficient Permissions');
	  	err.status = 401;
	  	next(err);
	}
}