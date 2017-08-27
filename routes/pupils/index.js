const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.json({ data: 'Nastya, Maxim'});
});

router.get('/one', (req, res, next) => {
	res.json({ data: 'Nastya' });
});

module.exports = router;