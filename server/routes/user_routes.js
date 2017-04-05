const express = require('express');
const router = express.Router();


// controllers
const MainController = require('../controllers/mainController');


router.get('/info', MainController.getInfo);

router.post('/signin', MainController.afterLogin);

router.post('/location', MainController.changeLocation);

router.post('/search', MainController.changeSearch);

router.post('/edit', MainController.editUser);

router.get('/hotel', MainController.getHotelPeers);

router.get('/messages', MainController.getMessages);

router.get('/peers', MainController.getChatPeers);

router.post('/delete', MainController.deleteUser);


module.exports = router;
