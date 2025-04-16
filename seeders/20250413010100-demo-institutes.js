const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const institutes = [];
    for (let i = 0; i < 10; i++) {
      institutes.push({
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        createdAt: new Date(),
        updatedAt: new Date(),
        voided: institutes.length % 2 === 0,
      });
    }
    await queryInterface.bulkInsert("Institutes", institutes);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Institutes", null, {});
  },
};
