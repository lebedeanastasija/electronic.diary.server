const sequelize = require('../../index');
const Sequelize = require('sequelize');

const Subject = sequelize.define('subject', {
	id: {
		type: Sequelize.INTEGER,
		field: 'subject_id',
		primaryKey: true,
		autoIncrement: true
	},
	shortName: {
		type: Sequelize.STRING,
        field: 'short_name',
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
        allowNull: false
	},
    description: {
	    type: Sequelize.TEXT
    }
}, {
	freezeTableName: true,
	createdAt: false,
	updatedAt: false
});

module.exports = Subject;