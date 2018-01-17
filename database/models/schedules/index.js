const sequelize = require('../../index');
const Sequelize = require('sequelize');
const Class = require('../classes');
const Subject = require('../subjects');
const Teacher = require('../teachers');

const Schedule = sequelize.define('schedule', {
    id: {
        type: Sequelize.INTEGER,
        field: 'schedule_id',
        primaryKey: true,
        autoIncrement: true
    },
    subjectId: {
        type: Sequelize.INTEGER,
        field: 'subject_id'
    },
    classId: {
        type: Sequelize.INTEGER,
        field: 'class_id'
    },
    teacherId: {
        type: Sequelize.INTEGER,
        field: 'teacher_id'
    },
    weekDay: {
        type: Sequelize.ENUM('0', '1', '2', '3', '4', '5', '6'),
        field: 'week_day'
    },
    startTime: {
        type: Sequelize.TIME,
        field: 'start_time'
    },
    endTime: {
        type: Sequelize.TIME,
        field: 'end_time'
    },
    place: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

Schedule.belongsTo(Subject, { foreignKey: 'subject_id' });
Schedule.belongsTo(Class, { foreignKey: 'class_id' });
Schedule.belongsTo(Teacher, { foreignKey: 'teacher_id' });


module.exports = Schedule;