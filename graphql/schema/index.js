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
  type AuthPayloadSignUp {
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

  # Institute paginated results schema
  type InstituteResultsPagination {
    institutes: [Institute!]!
    totalCount: Int!
  }

  # Course schema
  type Course {
    id: ID!
    name: String!
    code: String!
    credits: Int!
    institute_id: Int!
  }

  type CoursePagination {
    courses: [Course!]!
    totalCount: Int!
  }

  # TopStudent schema
  type TopStudent {
    student_id: Int
    student_name: String
    student_email: String
    rank: Int
    highest_score: String
    course_name: String!
    year: Int!
  }

  # TopStudent pagination
  type TopStudentPagination {
    results: [TopStudent!]!
    totalCount: Int!
  }

  # TopCourse schema
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

  # Result Pagination schema
  type ResultPagination {
    results: [Result!]!
    totalCount: Int!
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

  type StudentPagination {
    students: [Student!]!
    totalCount: Int!
  }

  # Queries
  type Query {
    # User queries
    getUsers: [User!]!
    getAllInstitutes: [Institute!]!
    getInstitute(id: ID!): Institute

    # Course queries
    getCourses(limit: Int, offset: Int): CoursePagination!
    getCourse(id: ID!): Course
    getTopCoursesPerYear(limit: Int): [TopCourse]

    # Result queries
    getResults(limit: Int, offset: Int): ResultPagination!
    getResult(id: ID!): Result
    getResultsPerInstitute(limit: Int, offset: Int): InstituteResultsPagination!

    # Updated TopStudents query with pagination
    getTopStudentsByResults(
      limit: Int
      offset: Int
      courseId: Int
      year: Int
    ): TopStudentPagination!

    # Student queries
    getAllStudents(limit: Int, offset: Int): StudentPagination!
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
    ): AuthPayloadSignUp!

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
