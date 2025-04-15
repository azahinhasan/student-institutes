const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Institute = sequelize.define(
  "Institute",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
    },
    voided: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        fields: ["voided"],
      },
      {
        fields: ["name"],
      },
    ],
  }
);

module.exports = Institute;
