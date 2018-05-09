
module.exports = (sequelize, DataTypes) => {
  const Mark = sequelize.define('mark', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'mark_id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    pupilId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'pupil_id',
      allowNull: false
    },
    typeId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'type_id',
      allowNull: false
    },
    valueId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'value_id',
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    scheduleId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'schedule_id'
    },
    subjectId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'subject_id'
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  Mark.associate = function (models) {
    this.belongsTo(models['pupil'], {
      foreignKey: 'pupilId',
      as: 'pupil'
    });
    this.belongsTo(models['mark_type'], {
      foreignKey: 'typeId',
      as: 'type'
    });
    this.belongsTo(models['mark_value'], {
      foreignKey: 'valueId',
      as: 'value'
    });
    this.belongsTo(models['schedule'], {
      foreignKey: 'scheduleId',
      as: 'schedule'
    });
    this.belongsTo(models['subject'], {
      foreignKey: 'subjectId',
      as: 'subject'
    });
  };

  return Mark;
};