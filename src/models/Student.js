const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Institute = require("./Institute");

const Student = sequelize.define(
  "Student",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    timestamps: true,
  }
);

Student.belongsTo(Institute, {
  foreignKey: "institute_id",
  onDelete: "CASCADE",
});
Institute.hasMany(Student, { foreignKey: "institute_id", as: "students" });

module.exports = Student;
