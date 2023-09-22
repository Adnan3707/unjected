const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('us_user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    time_created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    time_updated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    cognito_user_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      unique: "us_user_cognito_user_id_key"
    },
    first_name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    about_me: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    looking_for_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'us_profile_looking_for',
        key: 'id'
      }
    },
    profession_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'us_profile_profession',
        key: 'id'
      }
    },
    marital_status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'us_profile_marital_status',
        key: 'id'
      }
    },
    children: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    starsign_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'us_profile_starsign',
        key: 'id'
      }
    },
    instagram: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    website: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    deactivated: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    legacy_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'us_user',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "us_user_cognito_user_id_key",
        unique: true,
        fields: [
          { name: "cognito_user_id" },
        ]
      },
      {
        name: "us_user_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
