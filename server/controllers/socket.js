let mongoose = require('mongoose');
let rps = require('../actions/helpers');

module.exports = function(app) {
    let http = require('http').Server(app);
    let io = require('socket.io')(http);
    io.on('connection', function(socket){
        let Game = mongoose.model('Game');
        let User = mongoose.model('User');

        console.log('user connected');
        socket.on('disconnect', function(who){
            console.log('user disconnected',who);
            //todo
        });
        socket.on('lookForOpponent', function(user){
            Game.findOne({isSettled: false},function (err, game) {
                if(err) throw err;
                if(game){
                    game.isSettled = true;
                    game.gamer_two = user.user_id;
                    game.save(function (err, game) {
                        if(err) throw err;
                        io.emit('foundOpponent',{id: game._id});
                        io.emit('foundOpponentForYou',{id: game._id});
                    })
                }else{
                    let newgame = new Game({gamer_one: user.user_id});
                    newgame.save(function (err, game) {
                        if(err) throw err;
                        io.emit('findingOpponent',{id: game._id});
                    })
                }
            });
        });
        socket.on('betOn', function(sth){
            console.log('betting',sth.howMuch);
            let game_id = sth.id;
            let gamer_id = sth.gamer;
            Game.findOne({_id: game_id},function (err,game) {
                if(err) throw err;
                if(game){
                    if(gamer_id == game.gamer_one){
                        game.bet_one = sth.howMuch;
                    }else if(gamer_id == game.gamer_two){
                        game.bet_two = sth.howMuch;
                    }else{
                        //todo
                    }
                }else{
                    //todo
                }
                game.save(function (err) {
                    if(err) throw err;
                    if(game.bet_one && game.bet_two) {
                        io.emit('betDone', {id: game._id});
                    }
                })
            });
        });
        socket.on('sendingSymbol', function(sth){
            console.log('symbol');
            let game_id = sth.id;
            let gamer_id = sth.gamer;
            let symbol = sth.symbol;
            Game.findOne({_id: game_id},function (err,game) {
                if(err) throw err;
                if(game){
                    if(gamer_id == game.gamer_one){
                        game.symbol_one = sth.symbol;
                    }else if(gamer_id == game.gamer_two){
                        game.symbol_two = sth.symbol;
                    }else{
                        //todo
                    }
                }else{
                    //todo
                }
                let change =  false;
                if(game.symbol_two && game.symbol_one){
                    if(rps.isTie(game.symbol_one, game.symbol_two)){
                        game.result = 'tie';
                        game.save(function (err,game) {
                            if(err) throw err;
                            if(game.symbol_two && game.symbol_one){
                                io.emit('result',game);
                            }
                        })
                    }else if(rps.isWin(game.symbol_one, game.symbol_two)){
                        game.result = 'win';
                        change = true;
                    }else{
                        game.result = 'lose';
                        change = true;
                    }
                }else{
                    game.save(function (err,game) {
                        if(err) throw err;
                    })
                }
                if(change) {
                    User.findOne({_id: game.gamer_one},function (err, user1) {
                        if(err) throw err;
                        if(user1){
                            User.findOne({_id: game.gamer_two},function (err, user2) {
                                if(err) throw err;
                                if(user2){
                                    if(game.result == 'win'){
                                        user1.money += game.bet_two;
                                        user2.money -= game.bet_two;
                                    }else{
                                        user1.money -= game.bet_one;
                                        user2.money += game.bet_one;
                                    }
                                    user1.save(function(err){
                                        if(err) throw err;
                                        user2.save(function(err){
                                            if(err) throw err;
                                            game.save(function (err,game) {
                                                if(err) throw err;
                                                if(game.symbol_two && game.symbol_one){
                                                    io.emit('result',game);
                                                }
                                            })
                                        });
                                    });
                                }else{
                                    //todo
                                }
                            })
                        }else{
                            //todo
                        }

                    })
                }

            });
        });
    });

    // start the server
    http.listen(app.get('port'), function() {
        console.log('Express server listening on port', app.get('port'));
    });

    module.exports.IO = io;
};
