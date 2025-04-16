const authService = require("../services/auth.service");

const authResolvers = {
  Query: {
    getUsers: async () => {
      try {
        return await authService.getUsers();
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to fetch users.");
      }
    },
  },

  Mutation: {
    signUp: async (_, { name, email, password, role }) => {
      try {
        return await authService.signUp(name, email, password, role);
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to sign up user.");
      }
    },

    signIn: async (_, { email, password }, { res }) => {
      try {
        const { token, user } = await authService.signIn(email, password);

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 3600000, // 1 hour
        });

        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to sign in.");
      }
    },

    updateUser: async (_, { id, name, email, role, isActive }) => {
      try {
        return await authService.updateUser(id, name, email, role, isActive);
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to update user.");
      }
    },

    deleteUser: async (_, { id }) => {
      try {
        return await authService.deleteUser(id);
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to delete user.");
      }
    },
  },
};

module.exports = authResolvers;
