# Application Documentation

This application is built using Express.js, GraphQL, PostgreSQL, JWT authentication, Sequelize ORM, and other technologies.

# Getting Started
- Clone this repo
- Go to the application folder
- Run `npm i`
- Setup `.env`
  - Example:
  ```
    DB_PORT=5432
    DB_NAME=
    DB_USER=
    DB_PASS=
    DB_HOST=
    JWT_SECRET=supersecretkey
    APP_PORT=5000
  ```
- Now run `npm run sync-db`. This will create DB(if not exist) and table with indexing.
- Then, run `npm run seed`. This will populate DB with dummy data.
- Finaly, run `npm run dev`. Will start the app. 

# GraphQL Query Examples

## Auth Mutations

### **Sign-In Mutation**
`Note: The initial user (admin@test.com) is created during the database seeding process. This is the only publicly accessible mutation. Upon successful login, the JWT token is automatically stored in cookies and used for subsequent API requests.`
<br/>
`Alternatively, you can manually pass the token in the request header using -
Authorization: Bearer <token> `
<br/>
`Both methods are supported.`

```graphql
mutation {
  signIn(email: "admin@test.com", password: "admin123") {
    token
    user {
      id
      name
      email
    }
  }
}
```

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

