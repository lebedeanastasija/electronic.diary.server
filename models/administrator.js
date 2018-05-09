
module.exports = (sequelize, DataTypes) => {
  const Administrator = sequelize.define('administrator', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'administrator_id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    login: {
      type: DataTypes.STRING(45),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    avatarId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'avatar_id'
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  });

  Administrator.associate = function(models) {
    this.belongsTo(models['avatar'], {
      foreignKey: 'avatarId',
      as: 'avatar'
    });
  };

  return Administrator;
};