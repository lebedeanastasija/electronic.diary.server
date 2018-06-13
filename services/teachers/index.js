const Teacher = require('../../models/index').teacher;
const Subject = require('../../models/index').subject;
const Class = require('../../models/index').class;
const ClassNumber = require('../../models/index').class_number;
const ClassLetter = require('../../models/index').class_letter;
const Card = require('../../models/index').card;

function getAll() {
  return Teacher.findAll()
  .catch(() => Promise.reject({status: 500, message: 'Can not find teachers'}));
}

function getById(id) {
  return Teacher.find({where: {id}})
  .catch(() => Promise.reject({status: 500, message: 'Error occurred'}));
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

    return Teacher.find({
      where: {cardId: cardInfo.id},
      include: [{ model: Subject, as: 'subject'}
      ]})
    .then(teacherResult => {
      return Class.find({
        where: {teacherId: teacherResult.id},
        include: [
          {model: ClassNumber, as: 'number', attributes: ['value']},
          {model: ClassLetter, as: 'letter', attributes: ['value']}
        ]
      })
      .then(classResult => {
        let teacher = Object.assign({},teacherResult.dataValues);
        teacher.class = classResult;
        teacher.className = teacher.class.number.value + teacher.class.letter.value;
        return Promise.resolve(teacher);
      })
      .catch(err => {
        console.error(err);
        return Promise.resolve(teacherResult);
      })
    })
    .catch(() => Promise.reject({status: 500, message: 'Error occurred'}));
  });
  //

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
  getAll,
  getById,
  getByUID,
  update
};