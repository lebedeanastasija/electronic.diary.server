
module.exports = (sequelize, DataTypes) => {
  const MarkValue = sequelize.define('mark_value', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'value_id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING(45),
      unique: true
    },
    number: {
      type: DataTypes.INTEGER
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  return MarkValue;
};