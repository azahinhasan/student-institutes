const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # User schema
  type User {
    id: ID!
    name: String!
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
    students: [Student!]!
  }

  # Course schema
  type Course {
    id: ID!
    name: String!
    code: String!
    credits: Int!
    institute_id: Int!
  }

  type TopStudent {
    student_id: Int
    student_name: String
    student_email: String
    rank: Int
    highest_score: String
    course_name: String!
    year: Int!
  }

  type TopCourse {
    year: Int
    course_name: String
    rank: Int
    course_code: String
    student_count: Int
  }

  # Result schema
  type Result {
    id: ID!
    score: Float!
    grade: String!
    student_id: Int!
    course_id: Int!
    createdAt: String!
    updatedAt: String!
  }

  # Student schema
  type Student {
    id: ID!
    name: String!
    email: String!
    dob: String
    institute_id: ID!
    createdAt: String
    updatedAt: String
    results: [Result!]!
  }

  # Queries
  type Query {
    # User queries
    getUsers: [User!]!
    getAllInstitutes: [Institute!]!
    getInstitute(id: ID!): Institute

    # Course queries
    getCourses: [Course]
    getCourse(id: ID!): Course
    getTopCoursesPerYear(limit: Int): [TopCourse]

    # Result queries
    getResults: [Result]
    getResult(id: ID!): Result
    getResultsPerInstitute: [Institute!]!
    getTopStudentsByResults(limit: Int, courseId: Int, year: Int): [TopStudent]

    # Student queries
    getAllStudents: [Student]
    getStudent(id: ID!): Student
  }

  # Mutations
  type Mutation {
    # User mutations
    signUp(
      name: String!
      email: String!
      password: String!
      role: String
    ): AuthPayload!

    signIn(email: String!, password: String!): AuthPayload!

    updateUser(
      id: ID!
      name: String
      email: String
      role: String
      isActive: Boolean
    ): User!

    deleteUser(id: ID!): String!

    # Institute mutations
    createInstitute(name: String!, address: String): Institute!
    updateInstitute(id: ID!, name: String, address: String): Institute!
    deleteInstitute(id: ID!): String!

    # Course mutations
    createCourse(
      name: String!
      code: String!
      credits: Int!
      institute_id: Int!
    ): Course
    updateCourse(
      id: ID!
      name: String
      code: String
      credits: Int
      institute_id: Int
    ): Course
    deleteCourse(id: ID!): String

    # Result mutations
    createResult(
      score: Float!
      grade: String!
      student_id: Int!
      course_id: Int!
    ): Result
    updateResult(id: ID!, score: Float, grade: String): Result
    deleteResult(id: ID!): String

    # Student mutations
    createStudent(
      name: String!
      email: String!
      dob: String
      institute_id: ID!
    ): Student
    updateStudent(
      id: ID!
      name: String
      email: String
      dob: String
      institute_id: ID
    ): Student
    deleteStudent(id: ID!): String
  }
`;

module.exports = typeDefs;
