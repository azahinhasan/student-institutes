const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const institutes = [];
    for (let i = 0; i < 3; i++) {
      institutes.push({
        name: faker.company.name(),
        address: faker.address.streetAddress(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Institutes", institutes);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Institutes", null, {});
  },
};
