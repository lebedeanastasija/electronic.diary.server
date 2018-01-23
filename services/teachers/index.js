const Teacher = require('../../database/models/teachers');
const Subject = require('../../database/models/subjects');
const Class = require('../../database/models/classes');

function getById(id) {
    return Teacher.find({where: {id}})
    .catch(() => Promise.reject({status: 500, message: 'Error occurred'}));
}

function getByUID(uid) {
    return Teacher.find({where: {uid}, include: [
        { model: Subject}
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

module.exports = {
    getByUID
};