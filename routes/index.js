const express = require('express');
const passport = require('passport');

const router = express.Router();
console.log('Router loaded');
router.use('/user',require('./user'));
router.use('/profile',require('./profile'));
router.use('/post',require('./post'));
router.use('/answer',require('./answer'));
router.use('/comment',require('./comment'));





const setController = require('../controllers/home_controller');
router.get('/',passport.checkAuthentication,setController.home);
router.get('/contact_us',setController.contact);

module.exports = router;