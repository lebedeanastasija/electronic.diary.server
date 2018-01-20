const sequelize = require('../../index');
const Sequelize = require('sequelize');
const Pupil = require('../pupils');
const Schedule = require('../schedules');

const Mark = sequelize.define('mark', {
    id: {
        type: Sequelize.INTEGER,
        field: 'mark_id',
        primaryKey: true,
        autoIncrement: true
    },
    pupilId: {
        type: Sequelize.INTEGER,
        field: 'pupil_id'
    },
    value: {
        type: Sequelize.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10')
    },
    type: {
        type: Sequelize.ENUM('class', 'home', 'test', 'quarter', 'year')
    },
    date: {
        type: Sequelize.DATE
    },
    scheduleId: {
        type: Sequelize.INTEGER,
        field: 'schedule_id'
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

Mark.belongsTo(Pupil, { foreignKey: 'pupil_id' });
Mark.belongsTo(Schedule, { foreignKey: 'schedule_id' });

module.exports = Mark;