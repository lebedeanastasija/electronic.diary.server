'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('card', [{
      uid: '3438a59bbb956',
      in_use: false
    },{
      uid: '20c05f7e',
      in_use: true
    },{
      uid: 'e0ec1d83',
      in_use: true
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('card', null, {});
  }
};
