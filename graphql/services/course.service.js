const Course = require("../../models/Course");
const sequelize = require("../../config/database");

const getAllCourses = async ({ limit = 10, offset = 0 } = {}) => {
  try {
    const courses = await Course.findAndCountAll({
      where: {
        voided: false,
      },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return {
      courses: courses.rows,
      totalCount: courses.count,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch courses.");
  }
};

const getCourseById = async (id) => {
  try {
    return await Course.findOne({
      where: {
        id,
        voided: false,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Course not found.");
  }
};

const createCourse = async (name, code, credits, institute_id) => {
  try {
    const course = await Course.create({ name, code, credits, institute_id });
    return course;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create course.");
  }
};

const updateCourse = async (id, name, code, credits, institute_id) => {
  try {
    const course = await Course.findOne({
      where: {
        id,
        voided: false,
      },
    });

    if (!course) {
      throw new Error("Course not found.");
    }

    course.name = name || course.name;
    course.code = code || course.code;
    course.credits = credits || course.credits;
    course.institute_id = institute_id || course.institute_id;
    await course.save();

    return course;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update course.");
  }
};

const deleteCourse = async (id) => {
  try {
    const course = await Course.findOne({
      where: {
        id,
        voided: false,
      },
    });

    if (!course) {
      throw new Error("Course not found or already deleted.");
    }

    course.voided = true;
    await course.save();

    return `Course with ID ${id} marked as voided.`;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete course.");
  }
};

const getTopCoursesPerYear = async (limit = 3) => {
  try {
    const [results] = await sequelize.query(
      `
      SELECT *
      FROM (
        SELECT
          EXTRACT(YEAR FROM r."createdAt") AS year,
          c.name AS course_name,
          c.code AS course_code,
          COUNT(r.id) AS student_count,
          DENSE_RANK() OVER (
            PARTITION BY EXTRACT(YEAR FROM r."createdAt")
            ORDER BY COUNT(r.id) DESC
          ) AS rank
        FROM "Results" r
        JOIN "Courses" c ON r.course_id = c.id
        WHERE c.voided = FALSE
        GROUP BY year, c.id
      ) AS ranked
      WHERE rank <= :limit
      ORDER BY year, rank;
    `,
      {
        replacements: { limit },
      }
    );

    return results;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch top courses per year.");
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getTopCoursesPerYear,
};
