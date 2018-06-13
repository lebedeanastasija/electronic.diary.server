
module.exports = (sequelize, DataTypes) => {
  const Pupil = sequelize.define('pupil', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'pupil_id',
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
    classId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'class_id'
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

  Pupil.associate = function (models) {
    this.belongsTo(models['avatar'], {
      foreignKey: 'avatarId',
      as: 'avatar'
    });
    this.belongsTo(models['class'], {
      foreignKey: 'classId',
      as: 'class'
    });
    this.belongsTo(models['card'], {
      foreignKey: 'cardId',
      as: 'card'
    });
  };

  return Pupil;
};