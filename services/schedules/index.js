const Teacher = require('../../database/models/teachers');
const Schedule = require('../../database/models/subjects');
const Class = require('../../database/models/classes');
const Subject = require('../../database/models/subjects');

function getById(id) {
    return Schedule.find({where: {id}})
    .catch(() => Promise.reject({status: 500, message: 'Error occurred'}));
}

function getByTeacherId(teacherId) {
    let date = new Date();
    time = date.toTimeString();
    return Schedule.find({where: {teacherId}, include: [
        { model: Subject, model: Class, model: Teacher}
    ]})
    .catch(() => Promise.reject({status: 500, message: 'Error occurred'}));
}

module.exports = {
    getById,
    getByTeacherId
};