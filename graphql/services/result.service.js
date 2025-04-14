const Result = require("../../models/Result");
const Student = require("../../models/Student");
const Institute = require("../../models/Institute");
const Course = require("../../models/Course");

const getAllResults = async () => {
  try {
    return await Result.findAll({
      where: { voided: false },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch results.");
  }
};

const getResultById = async (id) => {
  try {
    return await Result.findOne({
      where: { id, voided: false },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Result not found.");
  }
};

const createResult = async (score, grade, student_id, course_id) => {
  try {
    const result = await Result.create({
      score,
      grade,
      student_id,
      course_id,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create result.");
  }
};

const updateResult = async (id, score, grade) => {
  try {
    const result = await Result.findOne({
      where: { id, voided: false },
    });

    if (!result) {
      throw new Error("Result not found.");
    }

    result.score = score ?? result.score;
    result.grade = grade ?? result.grade;
    await result.save();

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update result.");
  }
};

const deleteResult = async (id) => {
  try {
    const result = await Result.findOne({
      where: { id, voided: false },
    });

    if (!result) {
      throw new Error("Result not found.");
    }

    result.voided = true;
    await result.save();

    return `Result with ID ${id} marked as voided.`;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete result.");
  }
};

const getResultsPerInstitute = async () => {
  try {
    const results = await Institute.findAll({
      where: { voided: false },
      include: {
        model: Student,
        as: "students",
        where: { voided: false },
        required: false,
        include: [
          {
            model: Result,
            as: "results",
            where: { voided: false },
            required: false,
            include: [
              {
                model: Course,
                as: "course",
                where: { voided: false },
                required: false,
              },
            ],
          },
        ],
      },
    });

    return results;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch results per institute.");
  }
};

module.exports = {
  getAllResults,
  getResultById,
  createResult,
  updateResult,
  deleteResult,
  getResultsPerInstitute,
};
