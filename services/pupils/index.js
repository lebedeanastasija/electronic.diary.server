const Pupil = require('../../database/models/pupils');
const Class = require('../../database/models/classes');
const Teacher = require('../../database/models/teachers');

function getAll() {
	return Pupil.findAll({attributes: ['id', 'name', 'surname', 'patronymic', 'classId']})
	.catch(err => Promise.reject({status: 500, message: err.message}));
}

function getAllByClassId(classId) {
	return Class.find({where: {id: classId}})
	.then(classResult => {
		if(!classResult || !classResult.dataValues) {
			return Promise.reject({status: 404, message: `Class with id=${classId} does not exist`});
		}
		let classInfo = Object.assign({}, classResult.dataValues);
		return Pupil.findAll({ where: {classId: classInfo.id}, include: [{model: Avatar}] })
		.then(pupilsResult => {
			let result = {
				class: classInfo,
				pupils: pupilsResult
			};
			return Promise.resolve(result);
		})
	});
}

function getById(id) {
	return Pupil.find({where: {id}, attributes: ['id', 'name', 'surname', 'patronymic', 'classId'], include: [{model: Class, include: [{model: Teacher}]}]})
	.catch(() => Promise.reject({status: 500, message: 'Error occured'}));
}

function getByUID(uid) {
	return Pupil.find({where: {uid}, attributes: ['id', 'name', 'surname', 'patronymic', 'classId']})
	.catch(() => Promise.reject({status: 500, message: 'Error occured'}));
}

function create(uid, classId, name, surname, patronymic) {
	if(!uid || !classId || !name || !surname) {
		return Promise.reject({status: 400, message: 'Invalid pupil data'});
	}

	return new Promise((resolve, reject) => {
		Pupil.create({uid, classId, name, surname, patronymic})
		.then(pupilResult => {
			const result = Object.assign({}, pupilResult.dataValues);
			resolve(result);
		})
		.catch(err => reject({status: 500, message: 'Error occured'}));
	});
}

function remove(id) {
	return new Promise((resolve, reject) => {
		Pupil.findOne({where: {id}})
		.then(pupil => {
			pupil.destroy()
			.then(() => resolve({}));
		})
		.catch(() => Promise.reject({ status: 500}))
	});
}

function update(where, data) {
	return new Promise((resolve, reject) => {
		return Pupil.findOne({ where })
		.then(pupil => {
			pupil.update(data)
			.then(pupilResult => resolve(pupilResult))
			.catch(err => {
				console.error("Can not update pupil: \n",err);
				return reject({status: 500, message: err.message});
			})
		})
		.catch(err => {
			console.error("Can not find pupil: \n",err);
			return reject({status: 500, message: err.message});
		})
	})
}

module.exports = {
    getAll,
    getAllByClassId,
    getById,
    getByUID,
    create,
    remove,
	update
};