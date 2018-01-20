const sequelize = require('../../index');
const Sequelize = require('sequelize');

const Subject = sequelize.define('subject', {
	id: {
		type: Sequelize.INTEGER,
		field: 'subject_id',
		primaryKey: true,
		autoIncrement: true
	},
	abbreviation: {
		type: Sequelize.STRING
	},
	title: {
		type: Sequelize.STRING
	}
}, {
	freezeTableName: true,
	createdAt: false,
	updatedAt: false
});

module.exports = Subject;