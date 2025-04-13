const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const students = [];
    const usedEmails = new Set();

    const [institutes] = await queryInterface.sequelize.query(
      'SELECT id FROM "Institutes"'
    );

    let totalStudents = 0;
    while (totalStudents < 3000) {
      const email = faker.internet.email().toLowerCase();
      if (usedEmails.has(email)) continue;

      usedEmails.add(email);

      students.push({
        name: faker.person.fullName(),
        email: email,
        dob: faker.date.past({ years: 20 }).toISOString().split("T")[0],
        institute_id:
          institutes[Math.floor(Math.random() * (institutes.length - 1))].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      totalStudents++;
    }

    await queryInterface.bulkInsert("Students", students);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Students", null, {});
  },
};
