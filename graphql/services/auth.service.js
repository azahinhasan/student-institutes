const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const signUp = async (name, email, password, role) => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email is already in use.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      salt,
      role,
    });

    return { user };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Failed to sign up user.");
  }
};

const signIn = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.isActive) {
      throw new Error("Invalid email or password.");
    }

    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword !== user.password) {
      throw new Error("Invalid email or password.");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { token, user };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Failed to sign in.");
  }
};

const updateUser = async (id, name, email, role, isActive) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found.");
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.isActive = isActive !== undefined ? isActive : user.isActive;

    await user.save();

    return user;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Failed to update user.");
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found.");
    }

    await user.destroy();
    return `User with ID ${id} deleted successfully.`;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Failed to delete user.");
  }
};

const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch users.");
  }
};

module.exports = {
  signUp,
  signIn,
  updateUser,
  deleteUser,
  getUsers,
};
