const express = require('express');
const router = express.Router();

//TODO: authenticate

router.use('/pupils', require('./pupils'));
router.use('/classes', require('./classes'));
router.use('/teachers', require('./teachers'));
router.use('/avatars', require('./avatars'));
router.use('/marks', require('./marks'));
router.use('/admins', require('./administrators'));
router.use('/subjects', require('./subjects'));
router.use('/schedules', require('./schedules'));

router.use('/test', require('./test'));

module.exports = router;