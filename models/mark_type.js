
module.exports = (sequelize, DataTypes) => {
  const MarkType = sequelize.define('mark_type', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'type_id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
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

  return MarkType;
};