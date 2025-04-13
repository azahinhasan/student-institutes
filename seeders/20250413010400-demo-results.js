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

    const uniquePairs = new Set();

    while (results.length < 100000) {
      const student = students[Math.floor(Math.random() * students.length)];
      const course = courses[Math.floor(Math.random() * courses.length)];

      const key = `${student.id}-${course.id}`;
      if (uniquePairs.has(key)) continue; // skip if already exists

      uniquePairs.add(key);

      results.push({
        student_id: student.id,
        course_id: course.id,
        score: faker.number.int({ min: 50, max: 100 }),
        grade: faker.helpers.arrayElement(["A", "B", "C", "D", "F"]),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Results", results);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Results", null, {});
  },
};
