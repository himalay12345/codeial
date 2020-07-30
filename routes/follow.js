const express = require('express');


const router = express.Router();
const followerController = require('../controllers/follower_controller');

router.post('/toggle/:id',followerController.toggleFollow);

router.post('/topic/:id',followerController.topicFollow);




module.exports = router;