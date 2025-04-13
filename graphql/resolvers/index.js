const userResolvers = require("./auth.resolver");
const instituteResolvers = require("./institute.resolver");
const studentResolvers = require("./student.resolver");
const courseResolvers = require("./course.resolver");
const resultResolvers = require("./result.resolver");

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...instituteResolvers.Query,
    ...studentResolvers.Query,
    ...courseResolvers.Query,
    ...resultResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...instituteResolvers.Mutation,
    ...studentResolvers.Mutation,
    ...courseResolvers.Mutation,
    ...resultResolvers.Mutation,
  },
};

module.exports = resolvers;
