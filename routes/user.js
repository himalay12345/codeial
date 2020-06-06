const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');



router.get('/post',userController.post);
router.get('/sign-in',userController.signIn);
router.post('/forgot',userController.forgot);
router.get('/sign-up',userController.signUp);
router.post('/create',userController.create);
router.post('/update/:id',userController.update);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in',}
),userController.createSession); 
router.get('/sign-out',userController.destroySession);
router.get('/answer',passport.checkAuthentication,userController.answer);
router.get('/auth/google',passport.authenticate('google',{scope:('profile','email')}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/sign-in'}),userController.createSession);
router.get('/auth/facebook',passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback',passport.authenticate('facebook', {failureRedirect: '/user/sign-in' }),userController.createSession);

module.exports = router;