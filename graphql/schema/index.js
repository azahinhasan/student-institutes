const { gql } = require("apollo-server-express");

const typeDefs = gql`
  ######################
  #        TYPES       #
  ######################

  # User information including role and account status
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    isActive: Boolean!
  }

  # Payload returned after successful sign-in
  type AuthPayload {
    token: String!
    user: User!
  }

  # Payload returned after successful sign-up
  type AuthPayloadSignUp {
    user: User!
  }

  # Institute details
  type Institute {
    id: ID!
    name: String!
    address: String
    createdAt: String!
    updatedAt: String!
    students: [Student!]!
  }

  # Paginated response for institutes
  type InstituteResultsPagination {
    institutes: [Institute!]!
    totalCount: Int!
  }

  # Course details
  type Course {
    id: ID!
    name: String!
    code: String!
    credits: Int!
    institute_id: Int!
  }

  # Paginated response for courses
  type CoursePagination {
    courses: [Course!]!
    totalCount: Int!
  }

  # Aggregated result of top-performing students by course/year
  type TopStudent {
    student_id: Int
    student_name: String
    student_email: String
    rank: Int
    highest_score: String
    course_name: String!
    year: Int!
  }

  # Paginated response for top students
  type TopStudentPagination {
    results: [TopStudent!]!
    totalCount: Int!
  }

  # Aggregated top courses per year
  type TopCourse {
    year: Int
    course_name: String
    rank: Int
    course_code: String
    student_count: Int
  }

  # Result of a student in a course
  type Result {
    id: ID!
    score: Float!
    grade: String!
    student_id: Int!
    course_id: Int!
    createdAt: String!
    updatedAt: String!
  }

  # Paginated response for results
  type ResultPagination {
    results: [Result!]!
    totalCount: Int!
  }

  # Student information
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

  # Paginated response for students
  type StudentPagination {
    students: [Student!]!
    totalCount: Int!
  }

  ######################
  #      QUERIES       #
  ######################

  type Query {
    # Fetch all users
    getUsers: [User!]!

    # Institute queries
    getAllInstitutes: [Institute!]!
    getInstitute(id: ID!): Institute

    # Course queries
    getCourses(limit: Int, offset: Int): CoursePagination!
    getCourseById(id: ID!): Course
    getTopCoursesPerYear(limit: Int): [TopCourse]

    # Result queries
    getResults(limit: Int, offset: Int): ResultPagination!
    getResult(id: ID!): Result
    getResultsPerInstitute(limit: Int, offset: Int): InstituteResultsPagination!

    # Top-performing students query (with pagination)
    getTopStudentsByResults(
      limit: Int
      offset: Int
      courseId: Int
      year: Int
    ): TopStudentPagination!

    # Student queries
    getAllStudents(limit: Int, offset: Int): StudentPagination!
    getStudentById(id: ID!): Student
  }

  ######################
  #     MUTATIONS      #
  ######################

  type Mutation {
    # User registration
    signUp(
      name: String!
      email: String!
      password: String!
      role: String
    ): AuthPayloadSignUp!

    # User login
    signIn(email: String!, password: String!): AuthPayload!

    # Update existing user
    updateUser(
      id: ID!
      name: String
      email: String
      role: String
      isActive: Boolean
    ): User!

    # Delete a user by ID
    deleteUser(id: ID!): String!

    # Create a new institute
    createInstitute(name: String!, address: String): Institute!

    # Update an existing institute
    updateInstitute(id: ID!, name: String, address: String): Institute!

    # Delete an institute by ID
    deleteInstitute(id: ID!): String!

    # Create a new course
    createCourse(
      name: String!
      code: String!
      credits: Int!
      institute_id: Int!
    ): Course

    # Update existing course details
    updateCourse(
      id: ID!
      name: String
      code: String
      credits: Int
      institute_id: Int
    ): Course

    # Delete a course by ID
    deleteCourse(id: ID!): String

    # Create a result record
    createResult(
      score: Float!
      grade: String!
      student_id: Int!
      course_id: Int!
    ): Result

    # Update a result record
    updateResult(id: ID!, score: Float, grade: String): Result

    # Delete a result by ID
    deleteResult(id: ID!): String

    # Register a new student
    createStudent(
      name: String!
      email: String!
      dob: String
      institute_id: ID!
    ): Student

    # Update student information
    updateStudent(
      id: ID!
      name: String
      email: String
      dob: String
      institute_id: ID
    ): Student

    # Delete a student by ID
    deleteStudent(id: ID!): String
  }
`;

module.exports = typeDefs;
