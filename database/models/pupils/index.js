const sequelize = require('../../index');
const Sequelize = require('sequelize');

const Class = require('../classes');
const Avatar = require('../avatars');
const Card = require('../cards');

const Pupil = sequelize.define('pupil', {
	id: {
		type: Sequelize.INTEGER,
		field: 'pupil_id',
		primaryKey: true,
		autoIncrement: true
	},
	/*uid: {
		type: Sequelize.STRING
	},*/
	name: {
		type: Sequelize.STRING,
        allowNull: false
	},
	surname: {
		type: Sequelize.STRING,
        allowNull: false
	},
	patronymic: {
		type: Sequelize.STRING
	},
	classId: {
		type: Sequelize.INTEGER,
		field: 'class_id'
	},
	avatarId: {
		type: Sequelize.INTEGER,
		field: 'avatar_id'
	},
    cardId: {
	    type: Sequelize.INTEGER,
        field: 'card_id'
    }
}, {
	freezeTableName: true,
	createdAt: false,
	updatedAt: false
});

Pupil.belongsTo(Class, { foreignKey: 'class_id'});
Pupil.belongsTo(Avatar, { foreignKey: 'avatar_id'});
Pupil.hasOne(Card, { foreignKey: 'card_id'});

module.exports = Pupil;