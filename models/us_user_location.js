const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('us_user_location', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'us_user',
        key: 'id'
      }
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    label: {
      type: DataTypes.STRING(512),
      allowNull: true,
      defaultValue: ""
    },
    country: {
      type: DataTypes.STRING(128),
      allowNull: true,
      defaultValue: ""
    },
    region: {
      type: DataTypes.STRING(128),
      allowNull: true,
      defaultValue: ""
    },
    sub_region: {
      type: DataTypes.STRING(128),
      allowNull: true,
      defaultValue: ""
    },
    municipality: {
      type: DataTypes.STRING(128),
      allowNull: true,
      defaultValue: ""
    },
    street: {
      type: DataTypes.STRING(128),
      allowNull: true,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'us_user_location',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "us_user_location_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
