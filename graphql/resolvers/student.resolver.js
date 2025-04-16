const studentService = require("../services/student.service");

const studentResolvers = {
  Query: {
    getAllStudents: async ({ limit, offset }) => {
      try {
        return await studentService.getAllStudents(limit, offset);
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to fetch students.");
      }
    },

    getStudentById: async (_, { id }) => {
      try {
        return await studentService.getStudentById(id);
      } catch (error) {
        console.error(error);
        throw new Error(error.message);
      }
    },

    getTopStudentsByResults: async (_, { limit, offset, courseId, year }) => {
      try {
        return await studentService.getTopStudentsByResults(
          limit,
          offset,
          courseId,
          year
        );
      } catch (error) {
        console.error(error);
        throw new Error(
          error.message || "Failed to fetch top students by results."
        );
      }
    },
  },

  Mutation: {
    createStudent: async (_, { name, email, dob, institute_id }) => {
      try {
        return await studentService.createStudent({
          name,
          email,
          dob,
          institute_id,
        });
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to create student.");
      }
    },

    updateStudent: async (_, { id, name, email, dob, institute_id }) => {
      try {
        return await studentService.updateStudent(id, {
          name,
          email,
          dob,
          institute_id,
        });
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to update student.");
      }
    },

    deleteStudent: async (_, { id }) => {
      try {
        const message = await studentService.deleteStudent(id);
        return message;
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to delete student.");
      }
    },
  },
};

module.exports = studentResolvers;
