const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const results = [];

    const [students] = await queryInterface.sequelize.query(
      'SELECT id FROM "Students"'
    );
    const [courses] = await queryInterface.sequelize.query(
      'SELECT id FROM "Courses"'
    );

    let counter = 0;
    for (const student of students) {
      for (const course of courses) {
        if (counter >= 100000) break;

        results.push({
          student_id: student.id,
          course_id: course.id,
          score: faker.number.int({ min: 50, max: 100 }),
          grade: faker.helpers.arrayElement(["A", "B", "C", "D", "F"]),
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        counter++;
      }
      if (counter >= 100000) break;
    }

    await queryInterface.bulkInsert("Results", results);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Results", null, {});
  },
};
