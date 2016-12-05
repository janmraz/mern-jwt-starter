var mongoose = require('mongoose');

module.exports.init = function () {
    var userSchema = new mongoose.Schema({
        email:     { type: String, unique: true },
        name :     String,
        created: { type: Date, default: Date.now },
        password: String,
        emailConfirmed: false,
        emailConfirmCode: String,
        money: { type: Number, default: 50 }
    });

    var User = mongoose.model('User', userSchema);
};
