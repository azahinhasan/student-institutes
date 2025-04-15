const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Institute = require("./Institute");

const Course = sequelize.define(
  "Course",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    credits: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
        fields: ["code"],
      },
    ],
  }
);

Course.belongsTo(Institute, {
  foreignKey: "institute_id",
  onDelete: "CASCADE",
});
Institute.hasMany(Course, { foreignKey: "institute_id" });

module.exports = Course;
