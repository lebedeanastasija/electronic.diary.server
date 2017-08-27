const sequelize = require('../../index');
const Sequelize = require('sequelize');

const Subject = sequelize.define('subject', {
	id: {
		type: Sequelize.INTEGER,
		field: 'subject_id',
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING
	}
}, {
	freezeTableName: true,
	createdAt: false,
	updatedAt: false
});