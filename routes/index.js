const express = require('express');
const router = express.Router();

//TODO: authenticate

router.use('/pupils', require('./pupils'));
router.use('/classes', require('./classes'));

module.exports = router;