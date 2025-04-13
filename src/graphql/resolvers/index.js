const userResolvers = require("./auth.resolver");

const resolvers = {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};

module.exports = resolvers;
