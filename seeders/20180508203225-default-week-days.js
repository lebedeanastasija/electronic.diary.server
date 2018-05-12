'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('week_day', [{
      name: 'Понедельник',
      short_name: 'Пн',
      number: 0
    },{
      name: 'Вторник',
      short_name: 'Вт',
      number: 1
    },{
      name: 'Среда',
      short_name: 'Ср',
      number: 2
    },{
      name: 'Четверг',
      short_name: 'Чт',
      number: 3
    },{
      name: 'Пятница',
      short_name: 'Пт',
      number: 4
    },{
      name: 'Суббота',
      short_name: 'Сб',
      number: 5
    },{
      name: 'Воскресенье',
      short_name: 'Вс',
      number: 6
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('week_day', null, {});
  }
};
