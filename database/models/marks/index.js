const sequelize = require('../../index');
const Sequelize = require('sequelize');

const Pupil = require('../pupils');
const Schedule = require('../schedules');
const Subject = require('../subjects');
const MarkType = require('../markTypes');
const MarkValue = require('../markValues');

const Mark = sequelize.define('mark', {
    id: {
        type: Sequelize.INTEGER,
        field: 'mark_id',
        primaryKey: true,
        autoIncrement: true
    },
    pupilId: {
        type: Sequelize.INTEGER,
        field: 'pupil_id',
        allowNull: false
    },
    valueId: {
        type: Sequelize.INTEGER,
        field: 'value_id',
        allowNull: false
    },
    typeId: {
        type: Sequelize.INTEGER,
        field: 'type_id',
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    scheduleId: {
        type: Sequelize.INTEGER,
        field: 'schedule_id'
    },
    subjectId: {
        type: Sequelize.INTEGER,
        field: 'subject_id'
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

Mark.belongsTo(Pupil, { foreignKey: 'pupil_id' });
Mark.belongsTo(Schedule, { foreignKey: 'schedule_id' });
Mark.belongsTo(Subject, { foreignKey: 'subject_id'});
Mark.belongsTo(MarkType, {foreignKey: 'type_id'});
Mark.belongsTo(MarkValue, {foreignKey: 'value_id'});

module.exports = Mark;