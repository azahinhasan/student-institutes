# Application Documentation

This application is built with Express.js, GraphQL, PostgreSQL, JWT authentication, and Sequelize ORM. It supports modular CRUD operations, pagination, performance indexing, and authentication.


# Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/azahinhasan/student-institutes
   ```

2. **Navigate to the Project Directory**
   ```bash
   cd student-institutes
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Set Up Environment Variables**
   Create a `.env` file in the root directory and configure it with the following:
   ```env
   DB_PORT=5432
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASS=your_database_password
   DB_HOST=your_database_host
   JWT_SECRET=supersecretkey
   APP_PORT=5050
   ```

5. **Initialize the Database**
   Run the following command to create the database (if it doesn't exist), and set up tables with indexing:
   ```bash
   npm run sync-db
   ```

6. **Seed the Database with Dummy Data**
   ```bash
   npm run seed
   ```

7. **Start the Application**
   ```bash
   npm run dev
   ```

Application should now be up and running at `http://localhost:5050/graphql`


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

# Some Other Information

### Explain the approach to implementing JWT
- Using JWT which has validity 7 days.
- Token is sent back to the client via cookie or response.
- On protected routes, client sends token in Authorization header `Authorization: Bearer <your_token_here>` or cookie.
- Server generates JWT using user id and role.
- Middleware extracts and verifies the token using the secret.

### Some test after and before indexing

```sql
--Get results by student id--
SELECT * FROM "Results" r  WHERE student_id = 55;
-- Execution Time (Before): 1.496 ms
-- Execution Time (After): 0.048 ms
-- Dataset: 0.1 million results
```
```sql
--Get count total student by voided--
SELECT COUNT(*) FROM "Students" WHERE voided = false;
-- Execution Time (Before): 0.212 ms
-- Execution Time (After): 0.139 ms
-- Dataset: 0.1 million students
```
```sql
--Get all top students by results--
SELECT
  ranked.student_id,
  s.name AS student_name,
  s.email AS student_email,
  ranked.highest_score,
  ranked.rank AS rank,
  c.name AS course_name,
  ranked.year
FROM (
  SELECT
    r.student_id,
    r.course_id,
    MAX(r.score) AS highest_score,
    EXTRACT(YEAR FROM r."createdAt") AS year,
    DENSE_RANK() OVER (
      ORDER BY MAX(r.score) DESC
    ) AS rank
  FROM "Results" r
  JOIN "Students" s ON r.student_id = s.id AND s.voided = false
  JOIN "Courses" c ON r.course_id = c.id AND c.voided = false
  WHERE r.voided = false
  AND r.course_id = 165
  AND EXTRACT(YEAR FROM r."createdAt") = 2025
  GROUP BY r.student_id, r.course_id, EXTRACT(YEAR FROM r."createdAt")
) AS ranked
JOIN "Students" s ON ranked.student_id = s.id
JOIN "Courses" c ON ranked.course_id = c.id
ORDER BY ranked.rank;
-- Execution Time (Before): 1.847 ms
-- Execution Time (After): 0.081 ms
-- Dataset: Each 0.1 million students, results, and courses
```

```sql
--Get students by institute id--
select * from "Students" s where institute_id = 29;
-- Execution Time (Before): 0.137 ms
-- Execution Time (After): 0.023 ms
-- Dataset: 0.1 million student records
```
