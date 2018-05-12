'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('class_letter', [{
      value: 'A'
    },{
      value: 'Б'
    },{
      value: 'В'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('class_letter', null, {});
  }
};
