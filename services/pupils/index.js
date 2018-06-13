const Pupil = require('../../models/index').pupil;
const Class = require('../../models/index').class;
const Teacher = require('../../models/index').teacher;
const Avatar = require('../../models/index').avatar;
const Card = require('../../models/index').card;
const Attendance = require('../../models/index').m2m_attendance;

const scheduleService = require('../schedules');
const markService = require('../marks');

function getAll() {
	return Pupil.findAll({
    attributes: ['id', 'name', 'surname', 'patronymic', 'classId', 'avatarId']
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
    include: [{model: Class, as: 'class', include: [{model: Teacher, as: 'teacher'}]},
              {model: Avatar, as: 'avatar'}]
	})
	.catch(() => Promise.reject({status: 500, message: 'Error occured'}));
}

function getByUID(uid) {
  return Card.findOne({
    where: {uid, in_use: true},
  })
  .then(card => {
    if(!card || !card.dataValues) {
      return Promise.reject({status: 404, message: `Card is not registered in the system!`});
    }

    let cardInfo = Object.assign({}, card.dataValues);

    return Pupil.find({
      where: {cardId: cardInfo.id},
      attributes: ['id', 'name', 'surname', 'patronymic', 'classId', 'avatarId'],
      include: [{model: Class, as: 'class'}]
    })
    .then(pupil => {
      if(!pupil) {
        return Promise.resolve({status: 404, message: "Can not find pupil."})
      }
      let p = {
        id: pupil.id,
        name: pupil.name,
        surname: pupil.surname,
        patronymic: pupil.patronymic,
        classId: pupil.classId || null,
        avatarId: pupil.avatarId || null,
        cardId: pupil.cardId || null,
        attendance: null
      };
      return scheduleService.getCurrentByClass(pupil.classId)
      .then(lesson => {
        if(!lesson) {
          return Promise.resolve(p);
        }
        let date = new Date();
        let time = date.toTimeString().split(' ')[0];
        return Attendance.findOne({
          where: {pupilId: pupil.id, scheduleId: lesson.id, date}
        })
        .then(att => {
          if(att) {
            p.attendance = true;
            return Promise.resolve(p);
          }

          return markService.createAttendance(pupil.id, lesson.id, date, time)
          .then(() => {
            p.attendance = true;
            return Promise.resolve(p);
          })
        });
      })
      .catch(err => {
        console.error(err);
        return Promise.resolve(pupil);
      })
    });
  });
}

function create(name, surname, patronymic, cardId, classId, avatarId) {
	if(!(name && surname)) {
		return Promise.reject({status: 400, message: 'Invalid pupil data'});
	}

	avatarId = avatarId || 1;
	cardId = classId || null;
	classId = classId || null;

	return new Promise((resolve, reject) => {
		Pupil.create({cardId, classId, name, surname, patronymic, avatarId})
		.then(pupilResult => {
			const pupil = Object.assign({}, pupilResult.dataValues);
			resolve(pupil);
		})
		.catch(err => reject({status: 500, message: 'Error occured'}));
	});
}

function remove(id) {

  return Pupil.findOne({where: {id}})
  .then(pupil => {
    let pupilInfo = Object.assign({}, pupil.dataValues);
    pupil.destroy()
    .then(() => {
      if(!pupilInfo.cardId) {
        return Promise.resolve();
      }
      return Card.update({in_use: false}, {where: {id: pupilInfo.cardId}});
    });
  })
  .catch(() => Promise.reject({ status: 500}))

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