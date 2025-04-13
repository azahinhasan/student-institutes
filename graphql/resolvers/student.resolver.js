const studentService = require("../services/student.service");

const studentResolvers = {
  Query: {
    getAllStudents: async () => {
      try {
        return await studentService.getAllStudents();
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch students.");
      }
    },

    getStudent: async (_, { id }) => {
      try {
        return await studentService.getStudentById(id);
      } catch (error) {
        console.error(error);
        throw new Error("Student not found.");
      }
    },

    getTopStudentsByResults: async (_, { limit, courseId, year }) => {
      try {
        return await studentService.getTopStudentsByResults(
          limit,
          courseId,
          year
        );
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch top students by results.");
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
        throw new Error("Failed to create student.");
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
        throw new Error("Failed to update student.");
      }
    },

    deleteStudent: async (_, { id }) => {
      try {
        const message = await studentService.deleteStudent(id);
        return message;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete student.");
      }
    },
  },
};

module.exports = studentResolvers;
