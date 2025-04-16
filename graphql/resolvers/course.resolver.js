const courseService = require("../services//course.service");

const courseResolvers = {
  Query: {
    getCourses: async (_, { limit, offset }) => {
      try {
        return await courseService.getAllCourses(limit, offset);
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to fetch courses.");
      }
    },

    getCourseById: async (_, { id }) => {
      try {
        return await courseService.getCourseById(id);
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Course not found.");
      }
    },
    getTopCoursesPerYear: async (_, { limit }) => {
      try {
        return await courseService.getTopCoursesPerYear(limit);
      } catch (error) {
        console.error(error);
        throw new Error(
          error.message || "Failed to fetch top courses per year."
        );
      }
    },
  },

  Mutation: {
    createCourse: async (_, { name, code, credits, institute_id }) => {
      try {
        return await courseService.createCourse(
          name,
          code,
          credits,
          institute_id
        );
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to create course.");
      }
    },

    updateCourse: async (_, { id, name, code, credits, institute_id }) => {
      try {
        return await courseService.updateCourse(
          id,
          name,
          code,
          credits,
          institute_id
        );
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to update course.");
      }
    },

    deleteCourse: async (_, { id }) => {
      try {
        return await courseService.deleteCourse(id);
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to delete course.");
      }
    },
  },
};

module.exports = courseResolvers;
