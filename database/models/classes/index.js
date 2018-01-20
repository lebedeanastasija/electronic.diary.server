const sequelize = require('../../index');
const Sequelize = require('sequelize');
const Teacher = require('../teachers');

const Class = sequelize.define('class', {
	id: {
		type: Sequelize.INTEGER,
		field: 'class_id',
		primaryKey: true,
		autoIncrement: true
	},
	number: {
        type: Sequelize.ENUM('1', '2', '3', '4')
    },
	letter: {
        type: Sequelize.ENUM('A', 'B', 'V', 'G', 'D', 'E')
    },
	teacherId: {
		type: Sequelize.INTEGER,
		field: 'teacher_id'
	},
	enrollmentDate: {
		type: Sequelize.DATE,
		field: 'enrollment_date'
	},
	graduationDate: {
		type: Sequelize.DATE,
		field: 'graduation_date'
	}
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});


Class.belongsTo(Teacher, { foreignKey: 'teacher_id' });

module.exports = Class;