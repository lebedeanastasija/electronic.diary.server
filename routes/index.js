const express = require('express');
const router = express.Router();

//TODO: authenticate

router.use('/pupils', require('./pupils'));
router.use('/classes', require('./classes'));
router.use('/teachers', require('./teachers'));
router.use('/avatars', require('./avatars'));

module.exports = router;