const sequelize = require('../../index');
const Sequelize = require('sequelize');
const Class = require('../classes');

const Pupil = sequelize.define('pupil', {
	id: {
		type: Sequelize.INTEGER,
		field: 'pupil_id',
		primaryKey: true,
		autoIncrement: true
	},
	uid: {
		type: Sequelize.STRING
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

Pupil.belongsTo(Class, { foreignKey: 'class_id'});

module.exports = Pupil;