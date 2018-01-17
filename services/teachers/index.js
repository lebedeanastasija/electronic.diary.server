const Teacher = require('../../database/models/teachers');
const Subject = require('../../database/models/subjects');

function getById(id) {
    return Teacher.find({where: {id}})
    .catch(() => Promise.reject({status: 500, message: 'Error occurred'}));
}

function getByUID(uid) {
    return Teacher.find({where: {uid}, include: [
        { model: Subject}
    ]})
    .catch(() => Promise.reject({status: 500, message: 'Error occurred'}));
}

module.exports = {
    getByUID
};