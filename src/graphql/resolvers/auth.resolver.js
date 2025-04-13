const {
  signUp,
  signIn,
  updateUser,
  deleteUser,
  getUsers,
} = require("../services/auth.service");

const resolvers = {
  Query: {
    getUsers: async () => {
      return await getUsers();
    },
  },
  Mutation: {
    signUp: async (_, { username, email, password, role }) => {
      return await signUp(username, email, password, role);
    },
    signIn: async (_, { email, password }) => {
      return await signIn(email, password);
    },
    updateUser: async (_, { id, username, email, role, isActive }) => {
      return await updateUser(id, username, email, role, isActive);
    },
    deleteUser: async (_, { id }) => {
      return await deleteUser(id);
    },
  },
};

module.exports = resolvers;
