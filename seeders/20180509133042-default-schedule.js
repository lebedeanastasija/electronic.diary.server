'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('schedule', [{
      subject_id: 1,
      class_id: 1,
      room_id: 1,
      teacher_id: 1,
      week_day_id: 1,
      start_time: '08:00:00',
      end_time: '08:45:00'
    },{
      subject_id: 3,
      class_id: 1,
      room_id: 1,
      teacher_id: 1,
      week_day_id: 1,
      start_time: '09:00:00',
      end_time: '09:45:00'
    },{
      subject_id: 4,
      class_id: 1,
      room_id: 1,
      teacher_id: 1,
      week_day_id: 1,
      start_time: '10:00:00',
      end_time: '10:45:00'
    },{
      subject_id: 1,
      class_id: 1,
      room_id: 1,
      teacher_id: 1,
      week_day_id: 1,
      start_time: '11:00:00',
      end_time: '11:45:00'
    },{
      subject_id: 3,
      class_id: 1,
      room_id: 1,
      teacher_id: 1,
      week_day_id: 1,
      start_time: '12:00:00',
      end_time: '12:45:00'
    },{
      subject_id: 4,
      class_id: 1,
      room_id: 1,
      teacher_id: 1,
      week_day_id: 1,
      start_time: '13:00:00',
      end_time: '13:45:00'
    },{
      subject_id: 1,
      class_id: 1,
      room_id: 1,
      teacher_id: 1,
      week_day_id: 1,
      start_time: '14:00:00',
      end_time: '14:45:00'
    },{
      subject_id: 3,
      class_id: 1,
      room_id: 1,
      teacher_id: 1,
      week_day_id: 1,
      start_time: '15:00:00',
      end_time: '15:45:00'
    },{
      subject_id: 4,
      class_id: 1,
      room_id: 1,
      teacher_id: 1,
      week_day_id: 1,
      start_time: '16:00:00',
      end_time: '16:45:00'
    },
      {
        subject_id: 1,
        class_id: 1,
        room_id: 1,
        teacher_id: 1,
        week_day_id: 1,
        start_time: '17:00:00',
        end_time: '17:45:00'
      },{
        subject_id: 3,
        class_id: 1,
        room_id: 1,
        teacher_id: 1,
        week_day_id: 1,
        start_time: '18:00:00',
        end_time: '18:45:00'
      },{
        subject_id: 4,
        class_id: 1,
        room_id: 1,
        teacher_id: 1,
        week_day_id: 1,
        start_time: '19:00:00',
        end_time: '19:45:00'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('schedule', null, {});
  }
};
