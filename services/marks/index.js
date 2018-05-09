const Pupil = require('../../models/index').pupil;
const Mark = require('../../models/index').mark;
const Schedule = require('../../models/index').schedule;
const Subject = require('../../models/index').subject;
const MarkType = require('../../models/index').mark_type;
const MarkValue = require('../../models/index').mark_value;

function getAll() {
  return Mark.findAll()
  .catch(err => Promise.reject({status: 500, message: err.message}));
}

function getByPupilId(pupilId) {
  return Mark.find({
    where: {pupilId},
    include: [{model: Pupil, as: 'pupil'},
              {model: Schedule, as: 'schedule'},
              {model: Subject, as: 'subject'},
              {model: MarkType, as: 'type'},
              {model: MarkValue, as: 'value'}]
  })
  .catch(() => Promise.reject({status: 500, message: 'Error occured'}));
}

function create(typeId, valueId, pupilId, date, scheduleId, subjectId) {
  if(!(typeId && valueId && pupilId && date && (scheduleId || subjectId))) {
    return Promise.resolve({status: 400, message: 'Invalid marks data'});
  }
  let markData = {
    typeId,
    valueId,
    pupilId,
    date
  };

  if(scheduleId) {
    markData.scheduleId = scheduleId;
  } else {
    markData.subjectId = subjectId;
  }
  return Mark.create(markData)
  .catch(err => Promise.reject({status: 500, message: 'Error occured'}));
}


module.exports = {
  getAll,
  getByPupilId,
  create/*,
  remove,
  update*/
};