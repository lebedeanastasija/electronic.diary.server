
module.exports = (sequelize, DataTypes) => {
  const ClassNumber = sequelize.define('class_number', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'number_id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    value: {
      type: DataTypes.INTEGER,
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

  return ClassNumber;
};