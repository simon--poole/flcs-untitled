var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('./../models/user.model');

module.exports = User;

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