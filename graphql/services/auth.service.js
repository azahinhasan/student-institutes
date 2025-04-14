const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const signUp = async (name, email, password, role) => {
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
    role: role,
  });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
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
  if (!user.isActive) {
    throw new Error("Account is inactive.");
  }
  const hashedPassword = await bcrypt.hash(password, user.salt);

  if (hashedPassword != user.password) {
    throw new Error("Invalid email or password.");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user,
  };
};

const updateUser = async (id, name, email, role, isActive) => {
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
