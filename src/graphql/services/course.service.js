const Course = require("../../models/Course");

const getAllCourses = async () => {
  try {
    return await Course.findAll();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch courses.");
  }
};

const getCourseById = async (id) => {
  try {
    return await Course.findByPk(id);
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
    const course = await Course.findByPk(id);
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
    const course = await Course.findByPk(id);
    if (!course) {
      throw new Error("Course not found.");
    }
    await course.destroy();
    return `Course with ID ${id} deleted successfully.`;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete course.");
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
