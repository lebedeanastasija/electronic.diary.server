'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('class_number', [{
      value: 1
    },{
      value: 2
    },{
      value: 3
    },{
      value: 4
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('class_number', null, {});
  }
};
