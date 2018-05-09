
module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('m2m_attendance', {
    pupilId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'pupil_id',
      primaryKey: true,
      allowNull: false
    },
    scheduleId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'schedule_id',
      primaryKey: true,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      primaryKey: true,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false
  });

  Attendance.associate = function (models) {
    this.belongsTo(models['pupil'], {
      foreignKey: 'pupilId',
      as: 'pupil'
    });
    this.belongsTo(models['schedule'], {
      foreignKey: 'scheduleId',
      as: 'schedule'
    });
  };

  return Attendance;
};