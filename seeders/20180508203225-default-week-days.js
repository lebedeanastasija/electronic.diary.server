'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('week_day', [{
      name: 'Понедельник',
      short_name: 'Пн',
      number: 1
    },{
      name: 'Вторник',
      short_name: 'Вт',
      number: 2
    },{
      name: 'Среда',
      short_name: 'Ср',
      number: 3
    },{
      name: 'Четверг',
      short_name: 'Чт',
      number: 4
    },{
      name: 'Пятница',
      short_name: 'Пт',
      number: 5
    },{
      name: 'Суббота',
      short_name: 'Сб',
      number: 6
    },{
      name: 'Воскресенье',
      short_name: 'Вс',
      number: 7
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('week_day', null, {});
  }
};
