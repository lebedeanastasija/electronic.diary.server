const sequelize = require('../../index');
const Sequelize = require('sequelize');

const Card = sequelize.define('card', {
    id: {
        type: Sequelize.INTEGER,
        field: 'card_id',
        primaryKey: true,
        autoIncrement: true
    },
    uid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    inUse: {
        type: Sequelize.BOOLEAN,
        field: 'in_use',
        allowNull: false
    },
}, {
    freezeTableName: true,
    createAt: false,
    updateAt: false
});

module.exports = Card;