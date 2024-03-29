const config = require('../../config');

let SparkPost = require('sparkpost');
let sp = new SparkPost(config.spark_api);

const APP_NAME = config.app_name;
const APP_URL = 'https://www.rpsonlineapp.herokuapp.com';
const APP_EMAIL = 'testing@sparkpostbox.com';//todo

exports.welcomeEmail = function (email, emailConfirmCode) {

    sp.transmissions.send({
      transmissionBody: {
        content: {
          from: APP_EMAIL,
          subject: APP_NAME + ': Your new account',
          html:'<html><body><p>Hello and welcome to ' + APP_NAME + '!</p>\
          <p>Thanks so much for joining us.</p>\
          <p>You can login to your ' + APP_NAME + ' account right now to get started.</p>\
          <p>Please click the link below to confirm your email address and fully activate your account.</p>\
          <p>' + APP_URL +'/api/user/verify/'+ emailConfirmCode + '</p>\
          <p>This email confirmation link will expire in 24 hours.</p>\
          <p>Have any questions? Just send us an email! We\'re always here to help.</p>\
          <p>Support at ' + APP_NAME + '</p>\
          </body></html>'
        },
        recipients: [
          {address: email}
        ]
      }
    }, function(err) {
      if (err) {
        console.log('Whoops! Something went wrong with the welcomeEmail');
        console.log(err);
      }
    });

};

exports.confirmEmail = function (email, emailConfirmCode) {

    sp.transmissions.send({
      transmissionBody: {
        content: {
          from: APP_EMAIL,
          subject: APP_NAME + ': Confirm your email',
          html:'<html><body><p>Hello!</p>\
          <p>Please click the link below to confirm your email address and fully activate your account.</p>\
          <p>' + APP_URL + '/api/user/verify/' + emailConfirmCode + '</p>\
          <p>This email confirmation link will expire in 24 hours.</p>\
          <p>Have any questions? Just send us an email! We\'re always here to help.</p>\
          <p>Support at ' + APP_NAME + '</p>\
          </body></html>'
        },
        recipients: [
          {address: email}
        ]
      }
    }, function(err) {
      if (err) {
        console.log('Whoops! Something went wrong with the confirmEmail');
        console.log(err);
      }
    });

};


exports.forgotPasswordEmail = function (email, newPassword, callback) {

    sp.transmissions.send({
      transmissionBody: {
        content: {
          from: APP_EMAIL,
          subject: APP_NAME + ': Password Reset',
          html:'<html><body><p>Someone (hopefully you) requested a new password for the ' + APP_NAME + ' account for ' + email + '.</p>\
          <p>Your new password:</p>\
          <p>' + newPassword + '</p>\
          <p>Support at ' + APP_NAME + '</p>\
          </body></html>'
        },
        recipients: [
          {address: email}
        ]
      }
    }, function(err, res) {
      if (err) {
        console.log('Whoops! Something went wrong with the forgotPasswordEmail');
        callback(err);
      } else {
        callback(null, res);
      }
    });

};

exports.lockedOutEmail = function (email, callback) {

    sp.transmissions.send({
      transmissionBody: {
        content: {
          from: APP_EMAIL,
          subject: APP_NAME + ': Profile Locked Out',
          html:'<html><body><p>Someone (hopefully you) has had 10 failed password attempts on the ' + APP_NAME + ' account for ' + email + '.</p>\
          <p>For your security, we have locked your account for 60 minutes.</p>\
          <p>You will not be able to reset your password or log in for 1 hour.</p>\
          <p>After 60 minutes, you can log in as normal, or request a password reset by selecting \'Forgot my password\' from the log in page.</p>\
          <p>The account locks will clear on their own after an hour.</p>\
          <p>Support at ' + APP_NAME + '</p>\
          </body></html>'
        },
        recipients: [
          {address: email}
        ]
      }
    }, function(err, res) {
      if (err) {
        console.log('Whoops! Something went wrong with the lockedOutEmail');
        callback(err);
      } else {
        callback(null, res);
      }
    });

};
