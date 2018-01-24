const sequelize = require('../../index');
const Sequelize = require('sequelize');
const Subject = require('../subjects');
const  Avatar = require('../avatars');

const Teacher = sequelize.define('teacher', {
	id: {
		type: Sequelize.INTEGER,
		field: 'teacher_id',
		primaryKey: true,
		autoIncrement: true
	},
    uid: {
        type: Sequelize.STRING
    },
	subjectId: {
		type: Sequelize.INTEGER,
		field: 'subject_id'
	},
	name: {
		type: Sequelize.STRING
	},
	surname: {
		type: Sequelize.STRING
	},
	patronymic: {
		type: Sequelize.STRING
	},
    avatarId: {
        type: Sequelize.INTEGER,
        field: 'avatar_id'
    }
}, {
	freezeTableName: true,
	createdAt: false,
	updatedAt: false
});

Teacher.belongsTo(Subject, { foreignKey: 'subject_id' });
Teacher.belongsTo(Avatar, { foreignKey: 'avatar_id'});

module.exports = Teacher;