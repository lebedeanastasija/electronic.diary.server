const sequelize = require('../../index');
const Sequelize = require('sequelize');

const Pupil = require('../pupils');
const Schedule = require('../schedules');

const Attendance = sequelize.define('m2m_attendance', {
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
    time: {
        type: Sequelize.TIME,
        allowNull: false
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

Attendance.belongsTo('Pupil', { foreignKey: 'pupil_id' });
Attendance.belongsTo('Schedule', { foreignKey: 'schedule_id' });

module.exports = Attendance;