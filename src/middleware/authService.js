const { User } = require("../models");
const jwt = require("jsonwebtoken");

class AuthService {
  static async signUp(userData) {
    try {
      const user = await User.create(userData);
      const token = this.generateToken(user);
      return { user, token };
    } catch (error) {
      throw new Error(error.errors?.[0]?.message || "Registration failed");
    }
  }

  static async signIn(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.validPassword(password))) {
      throw new Error("Invalid credentials");
    }

    if (!user.isActive) {
      throw new Error("Account is inactive");
    }

    const token = this.generateToken(user);
    return { user, token };
  }

  static generateToken(user) {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  }
}

module.exports = AuthService;
