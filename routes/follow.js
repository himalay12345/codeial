const express = require('express');


const router = express.Router();
const followerController = require('../controllers/follower_controller');

router.post('/toggle/:id',followerController.toggleFollow);




module.exports = router;