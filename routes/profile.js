const express = require('express');
const router = express.Router();
const passport = require('passport');

const profileController = require('../controllers/profile_controller');


router.get('/user/:id',passport.checkAuthentication,profileController.create);
router.get('/question/:id',profileController.question);
router.get('/answer/:id',profileController.answer);
router.get('/follower/:id',profileController.follower);
router.get('/following/:id',profileController.following);

module.exports = router;