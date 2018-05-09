
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('schedule', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'schedule_id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    subjectId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'subject_id',
      allowNull: false
    },
    classId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'class_id',
      allowNull: false
    },
    roomId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'room_id',
      allowNull: false
    },
    teacherId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'teacher_id'
    },
    weekDayId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'week_day_id',
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,
      field: 'start_time',
      allowNull: false
    },
    endTime: {
      type: DataTypes.TIME,
      field: 'end_time',
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  Schedule.associate = function (models) {
    this.belongsTo(models['subject'], {
      foreignKey: 'subjectId',
      as: 'subject'
    });
    this.belongsTo(models['class'], {
      foreignKey: 'classId',
      as: 'class'
    });
    this.belongsTo(models['teacher'], {
      foreignKey: 'teacherId',
      as: 'teacher'
    });
    this.belongsTo(models['study_room'], {
      foreignKey: 'roomId',
      as: 'room'
    });
    this.belongsTo(models['week_day'], {
      foreignKey: 'weekDayId',
      as: 'weekDay'
    });
  };

  return Schedule;
};
