'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('teacher', [{
      name: 'Мария',
      surname: 'Абрамович',
      patronymic: 'Ивановна',
      card_id: 3,
      avatar_id: 1,
      subject_id: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teacher', null, {});
  }
};
