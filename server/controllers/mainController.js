'use strict';

const moment = require('moment');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Message = mongoose.model('Message');


exports.afterLogin = function (req, res) {
    let userData = req.body;
    User.findOne({email: req.body.email},function (err,data) {
        if(err) console.log(err);
        if(data == null){
            let newUser = new User();
            newUser.picture = userData.picture ? userData.picture.data.url : 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.0-1/c14.0.48.48/p48x48/10354686_10150004552801856_220367501106153455_n.jpg?oh=c2a164bf8dc9d7e131ee9cbb2ea47e8a&oe=595CE659';
            newUser.locale = userData.locale;
            newUser.email = userData.email;
            newUser.facebookId = userData.id;
            newUser.name = userData.name;
            newUser.birthday =  userData.birthday ? moment(userData.birthday, "MM/DD/YYYY").toDate().getTime() : 0;
            newUser.cover = userData.cover ? userData.cover.source : '';
            newUser.currency = userData.currency ? userData.currency.user_currency : 'USD';
            newUser.first_name = userData.first_name;
            newUser.last_name = userData.last_name;
            newUser.education = userData.education ? userData.education.length > 0 ? userData.education[0].school.name : '' : '';
            newUser.work = userData.work ? userData.work.length > 0 ? userData.work[0].employer.name : '' : '';
            newUser.locale = userData.locale;
            newUser.gender = userData.gender;
            newUser.save(function (err) {
                if(err) console.log(err);
                console.log('saved user');
                res.json({message: 'saved user'})
            });
        }else{
            console.log('signed in');
            res.json({message: 'signed in'})
        }
    });
};
exports.changeLocation = function (req, res) {
  let id = req.body.id;
  let location = req.body.location;
  User.findOne({facebookId: id},function (err, user) {
      if(err) throw err;
      user.location = location;
      user.save(function (err) {
          if(err) throw err;
          console.log('changed location to',location);
          res.json(location);
      })
  })
};
exports.changeSearch = function (req, res) {
  let id = req.body.id;
  let search = req.body.search;
  User.findOne({facebookId: id},function (err, user) {
      if(err) throw err;
      user.search = search;
      user.save(function (err) {
          if(err) throw err;
          console.log('changed search to',search);
          res.json(search);
      })
  })
};

exports.getMessages = function (req, res) {
    let id = req.query.id;
    let userid = req.query.userid;
    let query = {
        $or:
            [{$and:
                [
                    {"recipient": userid},
                    {"user": id}
                ]
            },{$and:
                [
                    {"recipient": id},
                    {"user": userid}
                ]
            }]
    };
    Message.find(query,function (err, data) {
        if(err) throw err;
        res.json(data);
    })
};

exports.getInfo = function (req, res) {
    let userid = req.query.id;
    User.findOne({facebookId: userid},function (err, user) {
        if(err) throw err;
        console.log('get user info',user.name);
        res.json({data: user});
    });
};

exports.getHotelPeers = function (req, res) {
    let userid = req.query.id;
    User.findOne({facebookId: userid},function (err, currUser) {
        User.find({location: currUser.location},function (err, users) {
            if(err) throw err;
            console.log('hotel peers',users);
            res.json(users.filter(user => user.facebookId != userid));
        })
    });
};

exports.getChatPeers  = function (req, res) {
    let userid  = req.query.id;
    let query = {$or:
                [
                    {"recipient": userid},
                    {"user": userid}
                ]
            };
    Message.find(query,function (err, messages) {
        if(err) throw err;
        let result = [];
        if(messages.length > 0){
            messages.forEach((message)=>{
               if(message.user == userid){
                   result.push(message.recipient);
               }else if(message.recipient == userid){
                   result.push(message.user);
               }
            });
            User.find({facebookId: [result.filter(onlyUnique)]},function (err, users) {
                if(err) throw err;
                res.json(users);
            });
        }else{
            res.json([])
        }
    });
};


let onlyUnique = function(value, index, self) {
    return self.indexOf(value) === index;
};
