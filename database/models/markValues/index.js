const sequelize = require('../../index');
const Sequelize = require('sequelize');

const MarkValue = sequelize.define('mark_value', {
    id: {
        type: Sequelize.INTEGER,
        field: 'value_id',
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: Sequelize.STRING
    },
    number: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

module.exports = MarkValue;