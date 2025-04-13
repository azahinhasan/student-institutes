const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Student = require("./Student");
const Course = require("./Course");

const Result = sequelize.define(
  "Result",
  {
    score: {
      type: DataTypes.DECIMAL(5, 2),
      validate: {
        min: 0,
        max: 100,
      },
    },
    grade: {
      type: DataTypes.STRING(2),
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["student_id", "course_id"],
      },
    ],
  }
);

Result.belongsTo(Student, { foreignKey: "student_id", onDelete: "CASCADE" });
Result.belongsTo(Course, { foreignKey: "course_id", onDelete: "CASCADE" });

Student.hasMany(Result, { foreignKey: "student_id", as: "results" });
Course.hasMany(Result, { foreignKey: "course_id" });

module.exports = Result;
