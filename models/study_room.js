
module.exports = (sequelize, DataTypes) => {
  const StudyRoom = sequelize.define('study_room', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'room_id',
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

  return StudyRoom;
};