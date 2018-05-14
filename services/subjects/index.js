const Subject = require('../../models/index').subject;

function getAll() {
  return Subject.findAll({})
  .catch(err => {
    console.error(err);
    return Promise.reject({status: 500, message: 'Can not find subjects!'})
  })
}

function remove(id) {
  return Subject.findOne({where: {id}})
  .then(subject => {
    return subject.destroy();
  })
  .catch(() => Promise.reject({ status: 500, message: "Can not find subject!"}));
}

module.exports = {
  getAll,
  remove
};