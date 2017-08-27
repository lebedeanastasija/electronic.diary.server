const sequelize = require('../../index');
const Sequelize = require('sequelize');
const Pupil = require('../pupils');
const Teacher = require('../teachers');

const Class = sequelize.define('class', {
	id: {
		type: Sequelize.INTEGER,
		field: 'class_id',
		primaryKey: true,
		autoIncrement: true
	},
	number: {
		type: Sequelize.INTEGER,
	},
	letter: {
		TYPE: Sequelize.CHAR
	},
	headTeacherId: {
		type: Sequelize.INTEGER,
		field: 'head_teacher_id'
	},
	enrollmentDate: {
		type: Sequelize.DATE,
		field: 'enrollment_date'
	},
	graduationDate: {
		type: Sequelize.DATE,
		field: 'graduation_date'
	},
	averageScore: {
		type: Sequelize.FLOAT
		field: 'average_score'
	},
	pupilsNumber: {
		type: Sequelize.INTEGER,
		field: 'pupils_number'
	}
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

Class.hasMany(Pupil, { foreignKey: 'class_id', as: 'pupils'});
Class.belongsTo(Teacher, { foreignKey: 'head_teacher_id' });

module.exports = Class;