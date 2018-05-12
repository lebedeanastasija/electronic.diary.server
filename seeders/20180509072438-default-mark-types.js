'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('mark_type', [{
      name: 'класс'
    },{
      name: 'дом'
    },{
      name: 'тест'
    },{
      name: 'четверть'
    },{
      name: 'год'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('mark_type', null, {});
  }
};
