var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Admin = require('./schemas').Admin;

Admin.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin', Admin);