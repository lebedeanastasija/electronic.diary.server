const Teacher = require('../../models/index').teacher;
const Subject = require('../../models/index').subject;
const Class = require('../../models/index').class;

function getById(id) {
  return Teacher.find({where: {id}})
  .catch(() => Promise.reject({status: 500, message: 'Error occurred'}));
}

function getByUID(uid) {
  return Teacher.find({
    where: {uid},
    include: [{ model: Subject, as: 'subject'}
  ]})
  .then(teacherResult => {
    return Class.find({ where: {teacherId: teacherResult.id} })
    .then(classResult => {
      let teacher = Object.assign({},teacherResult.dataValues);
      teacher.class = classResult;
      return Promise.resolve(teacher);
    })
    .catch(err => {
      console.error(err);
      return Promise.resolve(teacherResult);
    })
  })
  .catch(() => Promise.reject({status: 500, message: 'Error occurred'}));
}

function update(where, data) {
  return new Promise((resolve, reject) => {
    return Teacher.findOne({ where })
    .then(teacher => {
      teacher.update(data)
      .then(teacherResult => resolve(teacherResult))
      .catch(err => {
        console.error("Can not update teacher: \n",err);
        return reject({status: 500, message: err.message});
      })
    })
    .catch(err => {
      console.error("Can not find teacher: \n",err);
      return reject({status: 500, message: err.message});
    })
  })
}

module.exports = {
  getById,
  getByUID,
  update
};