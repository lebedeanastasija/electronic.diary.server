const sequelize = require('../../index');
const Sequelize = require('sequelize');

const Avatar = sequelize.define('avatar', {
    id: {
        type: Sequelize.INTEGER,
        field: 'avatar_id',
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    originalName: {
        type: Sequelize.STRING,
        field: 'original_name'
    },
    url: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

module.exports = Avatar;