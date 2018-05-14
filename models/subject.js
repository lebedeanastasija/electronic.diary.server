
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('subject', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'subject_id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    shortName: {
      type: DataTypes.STRING(45),
      field: 'short_name',
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

  return Subject;
};