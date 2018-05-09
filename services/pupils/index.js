const Pupil = require('../../models/index').pupil;
const Class = require('../../models/index').class;
const Teacher = require('../../models/index').teacher;

function getAll() {
	return Pupil.findAll({
    attributes: ['id', 'name', 'surname', 'patronymic', 'classId']
	})
	.catch(err => Promise.reject({status: 500, message: err.message}));
}

function getAllByClassId(classId) {
	return Class.find({where: {id: classId}})
	.then(classResult => {
		if(!classResult || !classResult.dataValues) {
			return Promise.reject({status: 404, message: `Class with id=${classId} does not exist`});
		}
		let classInfo = Object.assign({}, classResult.dataValues);
		return Pupil.findAll({ where: {classId: classInfo.id} })
		.then(pupilsResult => {
			let result = {
				class: classInfo,
				pupils: pupilsResult.map(pupil => pupil.dataValues)
			};
			return Promise.resolve(result);
		})
	});
}

function getById(id) {
	return Pupil.find({
    where: {id},
    attributes: ['id', 'name', 'surname', 'patronymic', 'classId'],
    include: [{model: Class, as: 'class',
      include: [{model: Teacher, as: 'teacher'}]}]
	})
	.catch(() => Promise.reject({status: 500, message: 'Error occured'}));
}

function getByUID(uid) {
	return Pupil.find({
    where: {uid},
    attributes: ['id', 'name', 'surname', 'patronymic', 'classId', 'avatarId'],
    include: [{model: Class, as: 'class'}]
	})
	.catch(() => Promise.reject({status: 500, message: 'Error occured'}));
}

function create(uid, classId, name, surname, patronymic, avatarId) {
	if(!uid || !classId || !name || !surname) {
		return Promise.reject({status: 400, message: 'Invalid pupil data'});
	}

	return new Promise((resolve, reject) => {
		Pupil.create({uid, classId, name, surname, patronymic, avatarId})
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
  console.log("Where: ", where);
  return Pupil.findOne({ where })
  .then(pupil => {
    pupil.update(data)
    .catch(err => {
      console.error("Can not update pupil: \n",err);
      return Promise.reject({status: 500, message: err.message});
    })
  })
  .catch(err => {
    console.error("Can not find pupil: \n",err);
    return Promise.reject({status: 500, message: err.message});
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