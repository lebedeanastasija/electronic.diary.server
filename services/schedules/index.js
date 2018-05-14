const Teacher = require('../../models/index').teacher;
const Schedule = require('../../models/index').schedule;
const Class = require('../../models/index').class;
const Subject = require('../../models/index').subject;
const ClassNumber = require('../../models/index').class_number;
const ClassLetter = require('../../models/index').class_letter;
const StudyRoom = require('../../models/index').study_room;
const WeekDay = require('../../models/index').week_day;

function getAll() {
  return Schedule.findAll({
    include: [
      {model: Subject, as: 'subject', attributes: ['shortName']},
      {model: Class, as: 'class', attributes: ['id', 'numberId', 'letterId'], include: [
        {model: ClassNumber, as: 'number', attributes: ['value']},
        {model: ClassLetter, as: 'letter', attributes: ['value']}
      ]},
      {model: StudyRoom, as: 'room', attributes: ['name']},
      {model: Teacher, as: 'teacher', attributes: ['name', 'surname', 'patronymic']},
      {model: WeekDay, as: 'weekDay', attributes:['shortName']}
    ]})
  .catch(err => {
    console.error(err);
    return Promise.reject({status: 500, message: 'Can not find schedules!'});
  });
}

function getById(id) {
  return Schedule.find({where: {id}})
  .catch(() => Promise.reject({status: 500, message: 'Error occurred'}));
}

function getByTeacherId(teacherId) {
  let date = new Date();
  time = date.toTimeString();
  return Schedule.find({
    where: {teacherId},
    include: [{model: Subject, as: 'subject'},
              {model: Class, as: 'class'},
              {model: Teacher, as: 'teacher'}]
  })
  .catch(() => Promise.reject({status: 500, message: 'Error occurred'}));
}

module.exports = {
  getAll,
  getById,
  getByTeacherId
};