const express = require('express');
const router = express.Router();

//TODO: authenticate

router.use('/pupils', require('./pupils'));

module.exports = router;