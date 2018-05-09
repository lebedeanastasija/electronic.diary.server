
module.exports = (sequelize, DataTypes) => {
  const ClassLetter = sequelize.define('class_letter', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'letter_id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING(1),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING(500)
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  return ClassLetter;
};