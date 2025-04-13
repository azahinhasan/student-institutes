const userResolvers = require("./auth.resolver");
const instituteResolvers = require("./institute.resolver");

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...instituteResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...instituteResolvers.Mutation,
  },
};

module.exports = resolvers;
