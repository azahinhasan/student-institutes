const resultService = require("../services/result.service");

const resultResolvers = {
  Query: {
    getResults: async (_, { limit, offset }) => {
      try {
        return await resultService.getAllResults(limit, offset);
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to fetch results.");
      }
    },

    getResult: async (_, { id }) => {
      try {
        return await resultService.getResultById(id);
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Result not found.");
      }
    },

    getResultsPerInstitute: async (_, { limit, offset }) => {
      try {
        return await resultService.getResultsPerInstitute(limit, offset);
      } catch (error) {
        console.error(error);
        throw new Error(
          error.message || "Failed to fetch results per institute."
        );
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
        throw new Error(error.message || "Failed to create result.");
      }
    },

    updateResult: async (_, { id, score, grade }) => {
      try {
        return await resultService.updateResult(id, score, grade);
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to update result.");
      }
    },

    deleteResult: async (_, { id }) => {
      try {
        return await resultService.deleteResult(id);
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to delete result.");
      }
    },
  },
};

module.exports = resultResolvers;
