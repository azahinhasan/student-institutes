const instituteService = require("../services/institute.service");

const instituteResolvers = {
  Query: {
    getAllInstitutes: async () => {
      try {
        return await instituteService.getAllInstitutes();
      } catch (error) {
        console.error(error);
        throw new Error(error.message);
      }
    },

    getInstitute: async (_, { id }) => {
      try {
        return await instituteService.getInstituteById(id);
      } catch (error) {
        console.error(error);
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    createInstitute: async (_, { name, address }) => {
      try {
        return await instituteService.createInstitute(name, address);
      } catch (error) {
        console.error(error);
        throw new Error(error.message);
      }
    },

    updateInstitute: async (_, { id, name, address }) => {
      try {
        return await instituteService.updateInstitute(id, name, address);
      } catch (error) {
        console.error(error);
        throw new Error(error.message);
      }
    },

    deleteInstitute: async (_, { id }) => {
      try {
        return await instituteService.deleteInstitute(id);
      } catch (error) {
        console.error(error);
        throw new Error(error.message);
      }
    },
  },
};

module.exports = instituteResolvers;
