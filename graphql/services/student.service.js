const Student = require("../../models/Student");
const sequelize = require("../../config/database");

const getAllStudents = async (limit = 10, offset = 0) => {
  try {
    const students = await Student.findAll({
      where: { voided: false },
      limit,
      offset,
    });
    const totalCount = await Student.count({
      where: { voided: false },
    });

    return { students, totalCount };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch students.");
  }
};

const getStudentById = async (id) => {
  try {
    const student = await Student.findOne({ where: { id, voided: false } });
    if (!student) {
      throw new Error("Student not found.");
    }
    return student;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch student.");
  }
};

const createStudent = async ({ name, email, dob, institute_id }) => {
  try {
    const student = await Student.create({ name, email, dob, institute_id });
    return student;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Failed to create student.");
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
    throw new Error(error.message || "Failed to update student.");
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
    throw new Error(error.message || "Failed to delete student.");
  }
};

const getTopStudentsByResults = async (
  limit = 3,
  offset = 0,
  courseId = null,
  year = null
) => {
  try {
    const courseFilter = courseId ? `AND r.course_id = :courseId` : "";
    const yearFilter = year
      ? `AND EXTRACT(YEAR FROM r."createdAt") = :year`
      : "";
    const [countResult] = await sequelize.query(
      `
      SELECT COUNT(*) AS total_count FROM (
        SELECT
          r.student_id,
          r.course_id,
          MAX(r.score) AS highest_score,
          EXTRACT(YEAR FROM r."createdAt") AS year
        FROM "Results" r
        JOIN "Students" s ON r.student_id = s.id AND s.voided = false
        JOIN "Courses" c ON r.course_id = c.id AND c.voided = false
        WHERE r.voided = false
        ${courseFilter}
        ${yearFilter}
        GROUP BY r.student_id, r.course_id, EXTRACT(YEAR FROM r."createdAt")
      ) AS counted;
      `,
      {
        replacements: { courseId, year },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    const totalCount = parseInt(countResult.total_count, 10);

    // Fetch paginated ranked results
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
          DENSE_RANK() OVER (
            ORDER BY MAX(r.score) DESC
          ) AS rank
        FROM "Results" r
        JOIN "Students" s ON r.student_id = s.id AND s.voided = false
        JOIN "Courses" c ON r.course_id = c.id AND c.voided = false
        WHERE r.voided = false
        ${courseFilter}
        ${yearFilter}
        GROUP BY r.student_id, r.course_id, EXTRACT(YEAR FROM r."createdAt")
      ) AS ranked
      JOIN "Students" s ON ranked.student_id = s.id
      JOIN "Courses" c ON ranked.course_id = c.id
      ORDER BY ranked.rank
      LIMIT :limit OFFSET :offset;
      `,
      {
        replacements: { limit, offset, courseId, year },
      }
    );

    return {
      results,
      totalCount,
    };
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || "Failed to fetch top students by results."
    );
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
