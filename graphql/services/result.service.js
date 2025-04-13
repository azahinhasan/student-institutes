const Result = require("../../models/Result");
const Student = require("../../models/Student");
const Institute = require("../../models/Institute");
const Course = require("../../models/Course");

const getAllResults = async () => {
  try {
    return await Result.findAll();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch results.");
  }
};

const getResultById = async (id) => {
  try {
    return await Result.findByPk(id);
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
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create result.");
  }
};

const updateResult = async (id, score, grade) => {
  try {
    const result = await Result.findByPk(id);
    if (!result) {
      throw new Error("Result not found.");
    }
    result.score = score || result.score;
    result.grade = grade || result.grade;
    result.updatedAt = new Date();
    await result.save();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update result.");
  }
};

const deleteResult = async (id) => {
  try {
    const result = await Result.findByPk(id);
    if (!result) {
      throw new Error("Result not found.");
    }
    await result.destroy();
    return `Result with ID ${id} deleted successfully.`;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete result.");
  }
};

const getResultsPerInstitute = async () => {
  try {
    const results = await Institute.findAll({
      include: {
        model: Student,
        as: "students",
        include: [
          {
            model: Result,
            as: "results",
          },
        ],
      },
    });

    if (!results || results.length === 0) {
      return [];
    }
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
