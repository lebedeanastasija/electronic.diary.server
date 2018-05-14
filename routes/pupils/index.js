const express = require('express');
const router = express.Router();
const _ = require('lodash');

const pupilsService = require('../../services/pupils');
const fileService = require('../../services/files');

router.get('/', (req, res, next) => {
	pupilsService.getAll()
	.then(data => {
		res.json({
			data: data
		});
	})
	.catch(err => {
		res.status(err.status);
		res.json({
			data: err.message
		})
	});
});

router.get('/class/:classId', (req, res, next) => {
	let id = req.params.classId;
	pupilsService.getAllByClassId(id)
	.then(data => {
		res.json({
			data: data
		});
	})
	.catch(err => {
		res.status(err.status);
		res.json({
			data: err.message
		})
	});
});

router.get('/:id', (req, res, next) => {
	let id = req.params.id || null;
	if(!id) {
		res.status(400);
		return res.json({
			data: "Invalid pupil"
		});
	}

	pupilsService.getById(id)
	.then(data => {
		res.status(200);
		res.json({
			data: data
		});
	})
	.catch(err => {
		res.status(err.status);
		res.json({
			data: err.message
		})
	});
});

router.get('/uid/:uid', (req, res, next) => {
	let uid = req.params.uid || null;
	if(!uid) {
		res.status(400);
		return res.json({
			data: "Invalid uid"
		});
	}

	pupilsService.getByUID(uid)
	.then(data => {
		res.status(200);
		res.json({
			data: data
		});
	})
	.catch(err => {
		res.status(err.status);
		res.json({
			data: err.message
		})
	});
});

router.post('/', (req, res, next) => {
  let { cardId, classId, avatarId, name, surname, patronymic } = req.body;

	if(!name || !surname) {
		res.status(400);
		return res.json({
			data: 'Invalid pupil data'
		});
	}

	pupilsService.create(name, surname, patronymic, cardId, classId, avatarId)
	.then(data => {
		res.status(200);
		res.json({
			data
		});
	})
	.catch(err => {
		res.status(err.status);
		res.json({
			data: err.message
		});
	});
});

router.delete('/:id', (req, res, next) => {
	let id = req.params.id;
	if(!id) {
		res.status(400);
		return res.json({
			data: 'Incorrect pupil'
		});
	}

	pupilsService.remove(id)
	.then(data => {
		res.status(200);
		res.json({ data });
	})
	.catch(err => {
		res.status(err.status);
		res.json({ data: err.message });
	});
});

router.get('/avatar/:id', (req, res, next) => {
	let id = req.params.id;
	return fileService.getAvatar(id, res);
});

module.exports = router;