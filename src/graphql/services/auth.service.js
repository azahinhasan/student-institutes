const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/User");

const signUp = async (username, email, password, role) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email is already in use.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role: role || "student",
  });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h", // Token expires in 1 hour
    }
  );

  return {
    token,
    user,
  };
};

const signIn = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h", // Token expires in 1 hour
    }
  );

  return {
    token,
    user,
  };
};

const updateUser = async (id, username, email, role, isActive) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found.");
  }

  user.username = username || user.username;
  user.email = email || user.email;
  user.role = role || user.role;
  user.isActive = isActive !== undefined ? isActive : user.isActive;
  await user.save();

  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found.");
  }

  await user.destroy();
  return "User deleted successfully.";
};

const getUsers = async () => {
  return await User.findAll();
};

module.exports = {
  signUp,
  signIn,
  updateUser,
  deleteUser,
  getUsers,
};
