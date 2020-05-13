const express = require('express');
const setController = require('../controllers/index')

const router = express.Router();
console.log('Router loaded');

module.exports = router;

router.get('/',setController.home);
router.get('/contact_us',setController.contact);