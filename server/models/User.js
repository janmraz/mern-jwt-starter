var mongoose = require('mongoose');

module.exports.init = function () {
    var userSchema = new mongoose.Schema({
        email: String,
        name: String,
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now },
        facebookId: { type: String, unique: true },
        birthday: Number,
        picture: String,
        locale: String,
        cover: String,
        currency: String,
        first_name: String,
        last_name: String,
        gender: String,
        work: String,
        education: String,
        location: String,
        search: String,
        startDate: Number,
        endDate: Number,
        startDateSearch: Number,
        endDateSearch: Number,
    });
    var User = mongoose.model('User', userSchema);
};
