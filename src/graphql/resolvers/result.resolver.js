const resultService = require("../services/result.service");

const resultResolvers = {
  Query: {
    getResults: async () => {
      try {
        return await resultService.getAllResults();
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch results.");
      }
    },

    getResult: async (_, { id }) => {
      try {
        return await resultService.getResultById(id);
      } catch (error) {
        console.error(error);
        throw new Error("Result not found.");
      }
    },

    getResultsPerInstitute: async () => {
      try {
        return await resultService.getResultsPerInstitute();
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch results per institute.");
      }
    },
  },

  Mutation: {
    createResult: async (_, { score, grade, student_id, course_id }) => {
      try {
        return await resultService.createResult(
          score,
          grade,
          student_id,
          course_id
        );
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create result.");
      }
    },

    updateResult: async (_, { id, score, grade }) => {
      try {
        return await resultService.updateResult(id, score, grade);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update result.");
      }
    },

    deleteResult: async (_, { id }) => {
      try {
        return await resultService.deleteResult(id);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete result.");
      }
    },
  },
};

module.exports = resultResolvers;
