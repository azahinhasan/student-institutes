const Student = require("../../models/Student");
const sequelize = require("../../config/database");

const getAllStudents = async () => {
  try {
    return await Student.findAll({ where: { voided: false } });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch students.");
  }
};

const getStudentById = async (id) => {
  try {
    return await Student.findOne({ where: { id, voided: false } });
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
    const student = await Student.findOne({ where: { id, voided: false } });
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
    const student = await Student.findOne({ where: { id, voided: false } });
    if (!student) {
      throw new Error("Student not found.");
    }

    student.voided = true;
    await student.save();

    return `Student with ID ${id} marked as voided.`;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete student.");
  }
};

const getTopStudentsByResults = async (
  limit = 3,
  courseId = null,
  year = null
) => {
  try {
    const [results] = await sequelize.query(
      `
      SELECT
        ranked.student_id,
        s.name AS student_name,
        s.email AS student_email,
        ranked.highest_score,
        ranked.rank AS rank,
        c.name AS course_name,
        ranked.year
      FROM (
        SELECT
          r.student_id,
          r.course_id,
          MAX(r.score) AS highest_score,
          EXTRACT(YEAR FROM r."createdAt") AS year,
          RANK() OVER (
            ORDER BY MAX(r.score) DESC
          ) AS rank
        FROM "Results" r
        JOIN "Students" s ON r.student_id = s.id AND s.voided = false
        JOIN "Courses" c ON r.course_id = c.id AND c.voided = false
        WHERE r.voided = false
        ${courseId ? `AND r.course_id = :courseId` : ""}
        ${year ? `AND EXTRACT(YEAR FROM r."createdAt") = :year` : ""}
        GROUP BY r.student_id, r.course_id, EXTRACT(YEAR FROM r."createdAt")
      ) AS ranked
      JOIN "Students" s ON ranked.student_id = s.id
      JOIN "Courses" c ON ranked.course_id = c.id
      ORDER BY ranked.rank
      LIMIT :limit;
      `,
      {
        replacements: { limit, courseId, year },
      }
    );

    return results;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch top students by results.");
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getTopStudentsByResults,
};
