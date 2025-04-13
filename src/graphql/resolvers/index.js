const userResolvers = require("./auth.resolver");
const instituteResolvers = require("./institute.resolver");
const studentResolvers = require("./student.resolver");

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...instituteResolvers.Query,
    ...studentResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...instituteResolvers.Mutation,
    ...studentResolvers.Mutation,
  },
};

module.exports = resolvers;
