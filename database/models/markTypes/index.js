const sequelize = require('../../index');
const Sequelize = require('sequelize');

const MarkType = sequelize.define('mark_type', {
    id: {
        type: Sequelize.INTEGER,
        field: 'type_id',
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

module.exports = MarkType;