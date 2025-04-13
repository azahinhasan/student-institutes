const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const courses = [];
    const usedCodes = new Set();

    const [institutes] = await queryInterface.sequelize.query(
      'SELECT id FROM "Institutes"'
    );

    for (const institute of institutes) {
      let i = 0;
      while (i < 10) {
        let code = faker.string.alphanumeric(10).toUpperCase();
        if (usedCodes.has(code)) continue;

        usedCodes.add(code);
        courses.push({
          name: faker.commerce.productName(),
          code,
          credits: faker.number.int({ min: 1, max: 5 }),
          institute_id: institute.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        i++;
      }
    }

    await queryInterface.bulkInsert("Courses", courses);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Courses", null, {});
  },
};
