'use strict';

const cookieParser = require('cookie-parser');

// const cors = require('cors');

// cors setup
// var corsOptions = {
//   origin: 'www.anotherdomain.com'
// };

module.exports = function (app) {

    // use cookierParser
    app.use(cookieParser());

    // allow requests from cross origin
    // app.use(cors(corsOptions));
    // ---------- API -------------

    // USER ROUTES
    const userRoutes = require('./user_routes');
    app.use('/api/user', userRoutes);

    app.get('/*',function (req,res) {
        res.sendFile(process.cwd() + '/public/html/app.html');
    });
};
