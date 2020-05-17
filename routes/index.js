const express = require('express');
const setController = require('../controllers/home_controller');

const router = express.Router();
console.log('Router loaded');
router.use('/user',require('./user'));



router.get('/',setController.home);
router.get('/contact_us',setController.contact);

module.exports = router;