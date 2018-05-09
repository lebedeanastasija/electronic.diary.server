
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('teacher', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'teacher_id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    patronymic: {
      type: DataTypes.STRING(45)
    },
    subjectId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'subject_id'
    },
    cardId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'card_id',
      unique: true
    },
    avatarId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
        field: 'avatar_id'
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  Teacher.associate = function (models) {
    this.belongsTo(models['avatar'], {
      foreignKey: 'avatarId',
      as: 'avatar'
    });
    this.belongsTo(models['subject'], {
      foreignKey: 'subjectId',
      as: 'subject'
    });
    this.belongsTo(models['card'], {
      foreignKey: 'cardId',
      as: 'card'
    });
  };

  return Teacher;
};