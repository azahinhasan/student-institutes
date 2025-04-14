# Project Documentation


## Auth Mutations

### **Sign-Up Mutation**

```graphql
mutation {
  signUp(
    name: "zahin_hasan"
    email: "zahin@example.com"
    password: "password123"
    role: "admin"
  ) {
    token
    user {
      id
      name
      email
    }
  }
}
```

### **Sign-In Mutation**

```graphql
mutation {
  signIn(email: "zahin@example.com", password: "password123") {
    token
    user {
      id
      name
      email
    }
  }
}
```

## Institute Queries and Mutations

### **Get All Institutes**

```graphql
query {
  getAllInstitutes {
    id
    name
    address
  }
}
```

### **Get Institute by ID**

```graphql
query {
  getInstitute(id: 1) {
    id
    name
    address
  }
}
```

### **Create Institute**

```graphql
mutation {
  createInstitute(name: "Institute A", address: "123 Main St") {
    id
    name
    address
  }
}
```

### **Update Institute**

```graphql
mutation {
  updateInstitute(id: 1, name: "Updated Institute", address: "456 New St") {
    id
    name
    address
  }
}
```

### **Delete Institute**

```graphql
mutation {
  deleteInstitute(id: 1)
}
```

## Student Queries and Mutations

### **Get All Students**

```graphql
query {
  getAllStudents(limit: 5, offset: 1) {
    students {
      id
      name
      email
    }
    totalCount
  }
}
```

### **Get Student by ID**

```graphql
query {
  getStudent(id: 1) {
    id
    name
    email
    dob
    institute_id
    createdAt
    updatedAt
  }
}
```

### **Get Results Per Institute of all students**

```graphql
query {
  getResultsPerInstitute(limit: 1, offset: 0) {
    totalCount
    institutes {
      id
      name
      address
      students {
        id
        name
        email
        dob
        results {
          id
          score
          grade
          course_id
        }
      }
    }
  }
}
```

### **Create Student**

```graphql
mutation {
  createStudent(
    name: "Zahin Hasan"
    email: "zahin.hasan@example.com"
    dob: "2000-01-01"
    institute_id: 1
  ) {
    id
    name
    email
    dob
    institute_id
  }
}
```

### **Update Student**

```graphql
mutation {
  updateStudent(
    id: 1
    name: "Zahin Hasan Updated"
    email: "zahin.hasan.updated@example.com"
    dob: "2000-01-01"
    institute_id: 1
  ) {
    id
    name
    email
    dob
    institute_id
  }
}
```

### **Delete Student**

```graphql
mutation {
  deleteStudent(id: 1)
}
```

## Course Queries and Mutations

### **Get All Courses**

```graphql
query {
  getCourses(limit: 10, offset: 5) {
    totalCount
    courses {
      id
      name
      code
      credits
      institute_id
    }
  }
}
```

### **Get Course by ID**

```graphql
query {
  getCourse(id: 1) {
    id
    name
    code
    credits
    institute_id
    createdAt
    updatedAt
  }
}
```

### **Top Courses Taken by uUsers Per Year**
`Note: The limit here refers to the maximum rank, not the number of results. For example, if limit = 3, it will return all courses ranked 1st, 2nd, or 3rd per year. If multiple courses have the same student_count, they will share the same rank — so the total number of results may exceed the limit due to ties.`
```graphql
query {
  getTopCoursesPerYear(limit: 3) {
    year
    rank
    course_name
    course_code
    student_count
  }
}
```

### **Create Course**

```graphql
mutation {
  createCourse(
    name: "Introduction to Computer Science"
    code: "CS101"
    credits: 3
    institute_id: 1
  ) {
    id
    name
    code
    credits
    institute_id
  }
}
```

### **Update Course**

```graphql
mutation {
  updateCourse(
    id: 1
    name: "Advanced Computer Science"
    code: "CS102"
    credits: 4
    institute_id: 1
  ) {
    id
    name
    code
    credits
    institute_id
  }
}
```

### **Delete Course**

```graphql
mutation {
  deleteCourse(id: 1)
}
```

## Result Queries and Mutations

### **Get All Results**

```graphql
query {
  getResults(limit: 5, offset: 1) {
    results {
      id
      score
      grade
      student_id
      course_id
      createdAt
      updatedAt
    }
    totalCount
  }
}
```

### **Get Result by ID**

```graphql
query {
  getResult(id: 1) {
    id
    score
    grade
    student_id
    course_id
    createdAt
    updatedAt
  }
}
```

### **Get List of Top Students by Results**

`Note:If user do not provide courseId or year, the query will return results from all courses and all years.
If user provide either courseId, year, or both, the results will be filtered accordingly — by the specific course, specific year, or the combination of both.`

```graphql
query {
  getTopStudentsByResults(limit: 10, offset: 0) {
    results {
      student_id
      student_name
      student_email
      rank
      highest_score
      course_name
      year
    }
    totalCount
  }
}
```
```graphql
query {
  getTopStudentsByResults(limit: 10, offset: 0, courseId: 60, year: 2025) {
    results {
      student_id
      student_name
      student_email
      rank
      highest_score
      course_name
      year
    }
    totalCount
  }
}
```

### **Create Result**

```graphql
mutation {
  createResult(score: 95.5, grade: "A", student_id: 1, course_id: 1) {
    id
    score
    grade
    student_id
    course_id
  }
}
```

### **Update Result**

```graphql
mutation {
  updateResult(id: 1, score: 88.0, grade: "B") {
    id
    score
    grade
    student_id
    course_id
  }
}
```

### **Delete Result**

```graphql
mutation {
  deleteResult(id: 1)
}
```

# Using Postman for GraphQL Testing

- **Set up your request** with the URL, method (`POST`), headers, and body (the GraphQL query/mutation).
- **Click Send** and check the response in the **Body** section of Postman.
- For mutations like `updateUser` or `deleteUser`, you will need to send the JWT token in the `Authorization` header as a Bearer token (e.g., `Authorization: Bearer <your_token_here>`).

By following these steps, you can easily test your GraphQL API for user authentication and management directly in Postman!
