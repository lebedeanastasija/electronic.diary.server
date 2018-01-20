const sequelize = require('../../index');
const Sequelize = require('sequelize');
const Pupil = require('../pupils');
const Schedule = require('../schedules');

const PupilLesson = sequelize.define('m2m_pupil_lesson', {
    pupilId: {
        type: Sequelize.INTEGER,
        field: 'pupil_id',
        primaryKey: true
    },
    scheduleId: {
        type: Sequelize.INTEGER,
        field: 'schedule_id',
        primaryKey: true
    },
    date: {
        type: Sequelize.DATE,
        primaryKey: true
    },
    isPresent: {
        type: Sequelize.BOOLEAN,
        field: 'is_present'
    },
    time: {
        type: Sequelize.TIME
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

PupilLesson.belongsTo('Pupil', { foreignKey: 'pupil_id' });
PupilLesson.belongsTo('Schedule', { foreignKey: 'schedule_id' });

module.exports = PupilLesson;