
module.exports = (sequelize, DataTypes) => {
  const Avatar = sequelize.define('avatar', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'avatar_id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return Avatar;
};