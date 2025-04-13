const Student = require("../../models/Student");

const getAllStudents = async () => {
  try {
    return await Student.findAll();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch students.");
  }
};

const getStudentById = async (id) => {
  try {
    return await Student.findByPk(id);
  } catch (error) {
    console.error(error);
    throw new Error("Student not found.");
  }
};

const createStudent = async ({ name, email, dob, institute_id }) => {
  try {
    const student = await Student.create({ name, email, dob, institute_id });
    return student;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create student.");
  }
};

const updateStudent = async (id, { name, email, dob, institute_id }) => {
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      throw new Error("Student not found.");
    }

    student.name = name || student.name;
    student.email = email || student.email;
    student.dob = dob || student.dob;
    student.institute_id = institute_id || student.institute_id;

    await student.save();
    return student;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update student.");
  }
};

const deleteStudent = async (id) => {
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      throw new Error("Student not found.");
    }
    await student.destroy();
    return `Student with ID ${id} deleted successfully.`;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete student.");
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
