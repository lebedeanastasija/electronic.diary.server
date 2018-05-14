
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('card', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'card_id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    inUse: {
      type: DataTypes.BOOLEAN,
      field: 'in_use',
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  return Card;
};