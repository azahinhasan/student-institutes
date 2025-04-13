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

Using Postman for GraphQL Testing
=================================
- **Set up your request** with the URL, method (`POST`), headers, and body (the GraphQL query/mutation).
- **Click Send** and check the response in the **Body** section of Postman.
- For mutations like `updateUser` or `deleteUser`, you will need to send the JWT token in the `Authorization` header as a Bearer token (e.g., `Authorization: Bearer <your_token_here>`).

By following these steps, you can easily test your GraphQL API for user authentication and management directly in Postman!

