const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const courses = [];
    const usedCodes = new Set();

    const [institutes] = await queryInterface.sequelize.query(
      'SELECT id FROM "Institutes"'
    );

    let i = 0;
    while (i < 156) {
      let code = faker.string.alphanumeric(10).toUpperCase();
      if (usedCodes.has(code)) continue;
      usedCodes.add(code);
      courses.push({
        name: faker.commerce.productName(),
        code,
        credits: faker.number.int({ min: 1, max: 5 }),
        institute_id:
          institutes[Math.floor(Math.random() * (institutes.length - 1))].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      i++;
    }

    await queryInterface.bulkInsert("Courses", courses);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Courses", null, {});
  },
};
