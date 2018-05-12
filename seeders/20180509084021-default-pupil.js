'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pupil', [{
      surname: 'Рудович',
      name: 'Инна',
      patronymic: 'Геннадьевна',
      card_id: 2,
      avatar_id: 1,
      class_id: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pupil', null, {});
  }
};
