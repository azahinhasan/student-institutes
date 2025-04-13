const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
// const Student = require("./Student");
// const Result = require("./Result");

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
  },
  {
    timestamps: true,
  }
);

// Defining Associations
// Institute.hasMany(Student, { foreignKey: "institute_id" });
// Student.belongsTo(Institute, { foreignKey: "institute_id" });

// Student.hasMany(Result, { foreignKey: "student_id" });
// Result.belongsTo(Student, { foreignKey: "student_id" });

module.exports = Institute;
