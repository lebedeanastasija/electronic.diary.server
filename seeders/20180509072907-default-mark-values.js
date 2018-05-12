'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('mark_value', [{
      number: 1,
      text: '1'
    },{
      number: 2,
      text: '2'
    },{
      number: 3,
      text: '3'
    },{
      number: 4,
      text: '4'
    },{
      number: 5,
      text: '5'
    },{
      number: 6,
      text: '6'
    },{
      number: 7,
      text: '7'
    },{
      number: 5,
      text: '8'
    },{
      number: 9,
      text: '9'
    },{
      number: 10,
      text: '10'
    },{
      number: 3,
      text: 'Плохо'
    },{
      number: 5,
      text: 'Удовлетворительно'
    },{
      number: 8,
      text: 'Хорошо'
    },{
      number: 10,
      text: 'Отлично'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('mark_value', null, {});
  }
};
