
module.exports = (sequelize, DataTypes) => {
  const WeekDay = sequelize.define('week_day', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'day_id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    shortName: {
      type: DataTypes.STRING(3),
      field: 'short_name',
      allowNull: false,
      unique:true
    },
    number: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      unique: true
    }
  },{
    freezeTableName: true,
    timestamps: false
  });

  return WeekDay;
};