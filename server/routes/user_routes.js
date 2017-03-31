const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// controllers
const MainController = require('../controllers/mainController');


router.get('/info', MainController.getInfo);

router.post('/location',jsonParser, MainController.changeLocation);

router.post('/search',jsonParser, MainController.changeSearch);

router.get('/hotel',jsonParser, MainController.getHotelPeers);

router.get('/messages',jsonParser, MainController.getMessages);

router.get('/peers',jsonParser, MainController.getChatPeers);


module.exports = router;
