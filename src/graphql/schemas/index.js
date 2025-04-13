// src/graphql/schemas/index.js

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    isActive: Boolean!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getUsers: [User!]!
  }

  type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
      role: String
    ): AuthPayload!
    signIn(email: String!, password: String!): AuthPayload!
    updateUser(
      id: ID!
      username: String
      email: String
      role: String
      isActive: Boolean
    ): User!
    deleteUser(id: ID!): String!
  }
`;

module.exports = typeDefs;
