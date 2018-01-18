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
	pupilsService.getAllByClassId()
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
	let uid = req.body.uid;
	let classId = req.body.classId;
	let name = req.body.name;
	let surname = req.body.surname;
	let patronymic = req.body.patronymic;

	if(!uid || !name || !surname) {
		res.status(400);
		return res.json({
			data: 'Invalid pupil data'
		});
	}

	pupilsService.create(uid, classId, name, surname, patronymic)
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

router.route('/:id/avatar/upload')
.post(fileService.upload.array("files"), (req, res, next) => {
	const PUPIL_ID = req.params.id;
	if(!PUPIL_ID) {
		console.error('Invalid pupil!');
		res.status(400);
		return res.json({data: "Invalid pupil!"});
	}
	const files = _.get(req, 'files', []);
	console.log('Files objects from s3 multer: ', files);
	return fileService.saveAvatar(files[0])
	.then(data => {
		return pupilsService.update({id: PUPIL_ID}, {avatarId: data.id})
		.then(data => {
            res.status(200);
            res.json({data})
		})
	})
	.catch(err => {
		res.status(err.status);
		res.json({ data: err.message })
	})
});

module.exports = router;