const Pupil = require('../../database/models/pupils');
const Mark = require('../../database/models/marks');
const Schedule = require('../../database/models/schedules');
const Subject = require('../../database/models/subjects');
const MarkType = require('../../database/models/markTypes');
const MarkValue = require('../../database/models/markValues');

function getAll() {
    return Mark.findAll()
    .catch(err => Promise.reject({status: 500, message: err.message}));
}

function getByPupilId(pupilId) {
    return Mark.find({
        where: {pupilId},
        include: [{model: Pupil},{ model: Schedule}, {model: Subject}, {model: MarkType}, {model: MarkValue}]
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