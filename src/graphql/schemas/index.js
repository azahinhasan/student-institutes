// src/graphql/schemas/index.js

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # User schema
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

  # Institute schema
  type Institute {
    id: ID!
    name: String!
    address: String
    createdAt: String!
    updatedAt: String!
  }

  # Queries
  type Query {
    getUsers: [User!]!
    getAllInstitutes: [Institute!]!
    getInstitute(id: ID!): Institute
  }

  # Mutations
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

    # Institute mutations
    createInstitute(name: String!, address: String): Institute!
    updateInstitute(id: ID!, name: String, address: String): Institute!
    deleteInstitute(id: ID!): String!
  }
`;

module.exports = typeDefs;
