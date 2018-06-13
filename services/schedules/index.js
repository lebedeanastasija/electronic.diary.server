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
  .then(schedules => {
    let response = [];
    schedules.forEach(schedule => response.push(_prepareSchedule(schedule)));
    return Promise.resolve(response);
  })
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

function getCurrentByTeacher(teacherId) {
  let date = new Date();
  let time = date.toTimeString().split(' ')[0];
  let weekDay = date.getDay();
  console.log('WEEK DAY: ', weekDay);

  return Schedule.findOne({
    where: {
      startTime: {$lte: time},
      endTime: {$gt: time},
      teacherId,
      weekDayId: weekDay
    },
    include: [
      {model: Subject, as: 'subject', attributes: ['shortName']},
      {
        model: Class, as: 'class', attributes: ['id', 'numberId', 'letterId'], include: [
        {model: ClassNumber, as: 'number', attributes: ['value']},
        {model: ClassLetter, as: 'letter', attributes: ['value']}
      ]
      },
      {model: StudyRoom, as: 'room', attributes: ['name']},
      {model: Teacher, as: 'teacher', attributes: ['name', 'surname', 'patronymic']},
      {model: WeekDay, as: 'weekDay', attributes: ['shortName']}
    ]
  })
  .then(schedule => Promise.resolve(_prepareSchedule(schedule)))
  .catch(err => {
    console.error(err);
    return Promise.reject({status: 500, message: 'Can not find lesson!'});
  });
}

function getCurrentByClass(classId) {
  let date = new Date();
  let time = date.toTimeString().split(' ')[0];
  let weekDay = date.getDay();
  console.log('WEEK DAY: ', weekDay);

  return Schedule.findOne({
    where: {
      startTime: {$lte: time},
      endTime: {$gt: time},
      classId,
      weekDayId: weekDay
    }
  })
  .catch(err => {
    console.error(err);
    return Promise.reject({status: 500, message: 'Can not find lesson!'});
  });
}

function getDayByTeacher(teacherId) {
    let date = new Date();
    let weekDay = date.getDay();
    console.log('WEEK DAY: ', weekDay);

  return Schedule.findAll({
    where: {
      teacherId: Number(teacherId),
      weekDayId: weekDay
    },
    include: [
      {model: Subject, as: 'subject', attributes: ['shortName']},
      {model: Class, as: 'class', attributes: ['id', 'numberId', 'letterId'], include: [
        {model: ClassNumber, as: 'number', attributes: ['value']},
        {model: ClassLetter, as: 'letter', attributes: ['value']}
      ]},
      {model: StudyRoom, as: 'room', attributes: ['name']},
      {model: Teacher, as: 'teacher', attributes: ['name', 'surname', 'patronymic']},
      {model: WeekDay, as: 'weekDay', attributes:['shortName', 'name']}
    ]
  })
  .then(schedules => {
    let preparedSchedules = [];
    console.log(schedules);
    if(!schedules.length) {
      return WeekDay.findOne({
        where: {number: weekDay}
      })
      .then(day => Promise.resolve([{weekDay: day.name}]))  ;
    }
    schedules.forEach(sch => {
      preparedSchedules.push(_prepareSchedule(sch, true));
    });
    return Promise.resolve(preparedSchedules);
  })
  .catch(err => {
    console.error(err);
    return Promise.reject({status: 500, message: 'Can not find lesson for today!'});
  });
}

function _prepareSchedule(schedule, fullDay) {
  let result = null;
  if(!schedule) {
    return result;
  }

  result = Object.assign({}, schedule.dataValues);

  result.time = result.startTime.split(':').slice(0, 2).join(':') + '-' + result.endTime.split(':').slice(0, 2).join(':');
  result.teacherName = result.teacher.surname + ' ' + result.teacher.name[0].toUpperCase() + '.';
  if(result.teacher.patronymic) {
    result.teacherName += result.teacher.patronymic[0].toUpperCase() + '.';
  }
  result.subjectName = result.subject.shortName;
  result.roomName = result.room.name + ' каб.';
  result.className = result.class.number.value + result.class.letter.value;
  result.weekDay = fullDay ? result.weekDay.name : result.weekDay.shortName;

  delete result.startTime;
  delete result.endTime;
  delete result.teacher;
  delete result.subject;
  delete result.room;
  delete result.class;

  return result;
}



module.exports = {
  getAll,
  getById,
  getByTeacherId,
  getCurrentByTeacher,
  getCurrentByClass,
  getDayByTeacher
};