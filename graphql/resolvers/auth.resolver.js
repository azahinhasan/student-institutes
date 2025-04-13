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
    signIn: async (_, { email, password }, { res }) => {
      const { token, user } = await signIn(email, password);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000, // Cookie expiration time (1 hour)
      });

      return {
        token,
        user,
      };
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
