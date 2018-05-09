const Teacher = require('../../models/index').teacher;
const Schedule = require('../../models/index').schedule;
const Class = require('../../models/index').class;
const Subject = require('../../models/index').subject;

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
  getById,
  getByTeacherId
};