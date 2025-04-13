const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const students = [];
    const usedEmails = new Set();

    const [institutes] = await queryInterface.sequelize.query(
      'SELECT id FROM "Institutes"'
    );

    let totalStudents = 0;
    for (const institute of institutes) {
      if (totalStudents >= 30) break;

      let i = 0;
      while (i < 10 && totalStudents < 30) {
        const email = faker.internet.email().toLowerCase();
        if (usedEmails.has(email)) continue;

        usedEmails.add(email);

        students.push({
          name: faker.person.fullName(),
          email: email,
          dob: faker.date.past({ years: 20 }).toISOString().split("T")[0],
          institute_id: institute.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        i++;
        totalStudents++;
      }
    }

    await queryInterface.bulkInsert("Students", students);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Students", null, {});
  },
};
