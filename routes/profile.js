const express = require('express');
const router = express.Router();
const passport = require('passport');

const profileController = require('../controllers/profile_controller');


router.get('/user/:id',passport.checkAuthentication,profileController.create);
router.get('/question',profileController.question);
router.get('/answer',profileController.answer);

module.exports = router;