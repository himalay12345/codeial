const express = require('express');


const router = express.Router();
console.log('Router loaded');
router.use('/user',require('./user'));
router.use('/post',require('./post'));



const setController = require('../controllers/home_controller');
router.get('/',setController.home);
router.get('/contact_us',setController.contact);

module.exports = router;