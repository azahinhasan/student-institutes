const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    await queryInterface.bulkInsert("Users", [
      {
        name: "admin",
        email: "admin@test.com",
        password: hashedPassword,
        salt,
        role: "admin",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", { email: "admin@test.com" }, {});
  },
};
