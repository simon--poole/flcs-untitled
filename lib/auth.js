var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('./../models/user.model');

module.exports = User;

module.exports.register = function(req, res){
	User.register(new User({
        username: req.body.username,
		priv: 0
    }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            res.send({
                success: true,
                user: user
            });
        }
    });
}
module.exports.login = function (req, res, next) {
 
    User.authenticate()(req.body.username, req.body.password, function (err, user, options) {
        if (err) return next(err);
        if (user === false) {
            res.send({
                message: options.message,
                success: false
            });
        } else {
            req.login(user, function (err) {
                res.send({
                    success: true,
                    user: user
                });
            });
        }
    });
 
};
module.exports.getuser = function (req, res) {
    if (req.user) {
        return res.send({
            success: true,
            user: req.user
        });
 
    }

    res.send({
        success: false,
        message: 'not authorized'
    });
};