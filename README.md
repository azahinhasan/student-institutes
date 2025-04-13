Project Documentation

Client-Side GraphQL API Testing with Postman
===========================================

This guide demonstrates how to interact with the GraphQL API using Postman for user management functionalities like **Sign-Up**, **Sign-In**, **Update User**, and **Delete User**.

1. **Set Up Postman for GraphQL**
-------------------------------------
1. Open **Postman** and create a new request.
2. Set the **request type** to `POST`.
3. In the **URL** field, enter your GraphQL server endpoint:
   http://localhost:4000/graphql
4. In the **Headers** tab, set the following headers:
   - `Content-Type`: `application/json`
   - `Authorization`: `Bearer <your_token_here>` (For requests that require authentication)

2. **Sign-Up Mutation**
-------------------------
**Request**:
- **Method**: `POST`
- **URL**: `http://localhost:4000/graphql`
- **Headers**:
  - `Content-Type`: `application/json`

**Body (GraphQL Mutation)**:
In the **Body** tab, select `raw` and set the format to `JSON`. Then, enter the following:

{
  "query": "mutation SignUp($username: String!, $email: String!, $password: String!, $role: String) { signUp(username: $username, email: $email, password: $password, role: $role) { token user { id username email } } }",
  "variables": {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "student"
  }
}

**Example Response**:

{
  "data": {
    "signUp": {
      "token": "your_jwt_token_here",
      "user": {
        "id": "1",
        "username": "john_doe",
        "email": "john@example.com"
      }
    }
  }
}

3. **Sign-In Mutation**
-------------------------
**Request**:
- **Method**: `POST`
- **URL**: `http://localhost:4000/graphql`
- **Headers**:
  - `Content-Type`: `application/json`

**Body (GraphQL Mutation)**:
In the **Body** tab, select `raw` and set the format to `JSON`. Then, enter the following:

{
  "query": "mutation SignIn($email: String!, $password: String!) { signIn(email: $email, password: $password) { token user { id username email } } }",
  "variables": {
    "email": "john@example.com",
    "password": "password123"
  }
}

**Example Response**:

{
  "data": {
    "signIn": {
      "token": "your_jwt_token_here",
      "user": {
        "id": "1",
        "username": "john_doe",
        "email": "john@example.com"
      }
    }
  }
}

4. **Update User Mutation**
----------------------------
To update a user's information, you will need to authenticate the user first by providing the JWT token from the Sign-In response.

**Request**:
- **Method**: `POST`
- **URL**: `http://localhost:4000/graphql`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <your_token_here>`  *(replace `<your_token_here>` with the JWT token you received from Sign-In)*

**Body (GraphQL Mutation)**:
In the **Body** tab, select `raw` and set the format to `JSON`. Then, enter the following:

{
  "query": "mutation UpdateUser($id: ID!, $username: String, $email: String, $role: String, $isActive: Boolean) { updateUser(id: $id, username: $username, email: $email, role: $role, isActive: $isActive) { id username email } }",
  "variables": {
    "id": "1",  // User ID to update
    "username": "john_doe_updated",
    "email": "john_updated@example.com",
    "role": "student",
    "isActive": true
  }
}

**Example Response**:

{
  "data": {
    "updateUser": {
      "id": "1",
      "username": "john_doe_updated",
      "email": "john_updated@example.com"
    }
  }
}

5. **Delete User Mutation**
----------------------------
To delete a user, you will need to authenticate the user first by providing the JWT token from the Sign-In response.

**Request**:
- **Method**: `POST`
- **URL**: `http://localhost:4000/graphql`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <your_token_here>`  *(replace `<your_token_here>` with the JWT token you received from Sign-In)*

**Body (GraphQL Mutation)**:
In the **Body** tab, select `raw` and set the format to `JSON`. Then, enter the following:

{
  "query": "mutation DeleteUser($id: ID!) { deleteUser(id: $id) }",
  "variables": {
    "id": "1"  // User ID to delete
  }
}

**Example Response**:

{
  "data": {
    "deleteUser": "User deleted successfully."
  }
}

6. **Institute Queries and Mutations**
--------------------------------------

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


6. **Student Queries and Mutations**
--------------------------------------

### **Get All Students**
```graphql
query {
  getAllStudents {
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

### **Get Results Per Institute**
```graphql
query {
  getResultsPerInstitute {
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
```

### **Create Student**
```graphql
mutation {
  createStudent(name: "John Doe", email: "john.doe@example.com", dob: "2000-01-01", institute_id: 1) {
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
  updateStudent(id: 1,  name: "John Doe Updated", email: "john.doe.updated@example.com", dob: "2000-01-01", institute_id: 1 ) {
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



7. **Course Queries and Mutations**
--------------------------------------

### **Get All Courses**
```graphql
query {
  getCourses {
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

### **Create Course**
```graphql
mutation {
  createCourse(name: "Introduction to Computer Science", code: "CS101", credits: 3, institute_id: 1) {
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
  updateCourse(id: 1, name: "Advanced Computer Science", code: "CS102", credits: 4, institute_id: 1) {
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

---

8. **Result Queries and Mutations**
--------------------------------------

### **Get All Results**
```graphql
query {
  getResults {
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


Using Postman for GraphQL Testing
=================================
- **Set up your request** with the URL, method (`POST`), headers, and body (the GraphQL query/mutation).
- **Click Send** and check the response in the **Body** section of Postman.
- For mutations like `updateUser` or `deleteUser`, you will need to send the JWT token in the `Authorization` header as a Bearer token (e.g., `Authorization: Bearer <your_token_here>`).

By following these steps, you can easily test your GraphQL API for user authentication and management directly in Postman!

