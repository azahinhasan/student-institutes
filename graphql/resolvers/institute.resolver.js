const instituteService = require("../services/institute.service");

const instituteResolvers = {
  Query: {
    getAllInstitutes: async () => {
      try {
        return await instituteService.getAllInstitutes();
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch institutes.");
      }
    },

    getInstitute: async (_, { id }) => {
      try {
        return await instituteService.getInstituteById(id);
      } catch (error) {
        console.error(error);
        throw new Error("Institute not found.");
      }
    },
  },

  Mutation: {
    createInstitute: async (_, { name, address }) => {
      try {
        return await instituteService.createInstitute(name, address);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create institute.");
      }
    },

    updateInstitute: async (_, { id, name, address }) => {
      try {
        return await instituteService.updateInstitute(id, name, address);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update institute.");
      }
    },

    deleteInstitute: async (_, { id }) => {
      try {
        return await instituteService.deleteInstitute(id);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete institute.");
      }
    },
  },
};

module.exports = instituteResolvers;
