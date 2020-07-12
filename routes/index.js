const express = require('express');
const passport = require('passport');

const router = express.Router();
console.log('Router loaded');
router.use('/user',require('./user'));
router.use('/profile',require('./profile'));
router.use('/post',require('./post'));
router.use('/answer',require('./answer'));
router.use('/comment',require('./comment'));
router.use('/likes',require('./like'));
router.use('/follow',require('./follow'));





const setController = require('../controllers/home_controller');
router.get('/',passport.checkAuthentication,setController.home);
router.get('/blog',passport.checkAuthentication,setController.blog);
router.get('/reset/:token',setController.resetPage);
router.post('/reset/:token',setController.resetPassword);
router.get('/contact_us',setController.contact);

module.exports = router;