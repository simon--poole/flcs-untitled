var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');



var User = mongoose.Schema ({
	username: String,
    password: String,
	priv: Number
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);