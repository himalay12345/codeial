const express = require('express');
const router = express.Router();
const passport = require('passport');


const answerController = require('../controllers/answer_controller');

router.post('/create',passport.checkAuthentication,answerController.create);
router.get('/destroy/:id',passport.checkAuthentication,answerController.destroy);
router.get('/all',passport.checkAuthentication,answerController.all);



module.exports = router;