const mongoose = require('mongoose');

module.exports = function(app) {
    let http = require('http').Server(app);
    let io = require('socket.io')(http);
    const Message = mongoose.model('Message');
    io.on('connection', function(socket){
        console.log('user connected');
        socket.on('disconnect', function(who){
            console.log('user disconnected',who);
        });
        socket.on('client:message', data => {
            let m = new Message(data);
            m.save(function (err) {
                if(err) throw err;
                console.log(data.username + ':' + data.message);
            });
            socket.emit('server:message', data);
        });
    });

    // start the server
    http.listen(app.get('port'), function() {
        console.log('Express server listening on port', app.get('port'));
    });

    module.exports.IO = io;
};
