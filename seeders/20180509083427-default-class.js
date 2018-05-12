'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('class', [{
      number_id: 1,
      letter_id: 1,
      teacher_id: 1,
      enrollment_date: '2017-09-03',
      graduation_date: '2018-05-20'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('class', null, {});
  }
};
