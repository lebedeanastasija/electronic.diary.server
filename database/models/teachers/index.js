const sequelize = require('../../index');
const Sequelize = require('sequelize');
const Subject = require('../subjects');

const Teacher = sequelize.define('teacher', {
	id: {
		type: Sequelize.INTEGER,
		field: 'teacher_id'
		primaryKey: true,
		autoIncrement: true
	},
	subjectId: {
		type: Sequelize.INTEGER,
		field: 'subject_id'
	}
	name: {
		type: Sequelize.STRING
	},
	surname: {
		type: Sequelize.STRING
	},
	patronymic: {
		type: Sequelize.STRING
	}
}, {
	freezeTableName: true,
	createdAt: false,
	updatedAt: false
});

Teacher.belongsTo(Subject, { foreignKey: 'subject_id' });

moule.exports = Teacher;