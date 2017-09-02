const sequelize = require('../../index');
const Sequelize = require('sequelize');

const Pupil = sequelize.define('pupil', {
	id: {
		type: Sequelize.INTEGER,
		field: 'pupil_id',
		primaryKey: true,
		autoIncrement: true
	},
	uid: {
		type: Sequelize.BIGINT
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
	classId: {
		type: Sequelize.INTEGER,
		field: 'class_id'
	}
}, {
	freezeTableName: true,
	createdAt: false,
	updatedAt: false
});

module.exports = Pupil;