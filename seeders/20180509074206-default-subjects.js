'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('subject', [{
      name: 'Беларуская мова',
      short_name: 'Бел.мова'
    },{
      name: 'Русский язык',
      short_name: 'Русск.яз.'
    },{
      name: 'Математика',
      short_name: 'Матем.'
    },{
      name: 'Музыка',
      short_name: 'Музыка'
    },{
      name: 'Физическая культура и здоровье',
      short_name: 'ФК и зд.'
    },{
      name: 'Основы безопасности жизнедеятельности',
      short_name: 'ОБЖ'
    },{
      name: 'Человек и мир',
      short_name: 'Чел. и мир'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subject', null, {});
  }
};
