const courseService = require("../services//course.service");

const courseResolvers = {
  Query: {
    getCourses: async () => {
      try {
        return await courseService.getAllCourses();
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch courses.");
      }
    },

    getCourse: async (_, { id }) => {
      try {
        return await courseService.getCourseById(id);
      } catch (error) {
        console.error(error);
        throw new Error("Course not found.");
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
        throw new Error("Failed to create course.");
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
        throw new Error("Failed to update course.");
      }
    },

    deleteCourse: async (_, { id }) => {
      try {
        return await courseService.deleteCourse(id);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete course.");
      }
    },
  },
};

module.exports = courseResolvers;
