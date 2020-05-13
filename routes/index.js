const express = require('express');
const setController = require('../controllers/home_controller')

const router = express.Router();
console.log('Router loaded');
router.use('/user',require('./user'));

module.exports = router;

router.get('/',setController.home);
router.get('/contact_us',setController.contact);