'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('administrator', [{
      login: 'admin',
      password: '111111',
      avatar_id: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('administrator', null, {});
  }
};
