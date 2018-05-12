'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('study_room', [{
      name: '101',
      description: 'Кабинет начальной школы'
    },{
      name: '102',
      description: 'Кабинет начальной школы'
    },{
      name: '201',
      description: 'Кабинет начальной школы'
    },{
      name: '202',
      description: 'Кабинет начальной школы'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('study_room', null, {});
  }
};
