

module.exports = function(app) {
    let http = require('http').Server(app);
    let io = require('socket.io')(http);
    io.on('connection', function(socket){
        console.log('user connected');
        socket.on('disconnect', function(who){
            console.log('user disconnected',who);
        });
    });

    // start the server
    http.listen(app.get('port'), function() {
        console.log('Express server listening on port', app.get('port'));
    });

    module.exports.IO = io;
};
