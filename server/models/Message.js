var mongoose = require('mongoose');

module.exports.init = function () {
    var messageSchema = new mongoose.Schema({
        message:String,
        time: { type: Date, default: Date.now },
        user:  String,
        recipient:  String,
        username:  String,
        recipientname:  String,
    });
    var Message = mongoose.model('Message', messageSchema);
};
