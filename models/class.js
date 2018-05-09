module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('class', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'class_id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    numberId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'number_id',
      allowNull: false
    },
    letterId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'letter_id',
      allowNull: false
    },
    teacherId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'teacher_id'
    },
    enrollmentDate: {
      type: DataTypes.DATEONLY,
      field: 'enrollment_date'
    },
    graduationDate: {
      type: DataTypes.DATEONLY,
      field: 'graduation_date'
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  Class.associate = function (models) {
    this.belongsTo(models['class_number'], {
      foreignKey: 'numberId',
      as: 'number'
    });
    this.belongsTo(models['class_letter'], {
      foreignKey: 'letterId',
      as: 'letter'
    });
    this.belongsTo(models['teacher'], {
      foreignKey: 'teacherId',
      as: 'teacher'
    });
  };

  return Class;
};