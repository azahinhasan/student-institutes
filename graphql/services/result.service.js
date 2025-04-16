const Result = require("../../models/Result");
const Student = require("../../models/Student");
const Institute = require("../../models/Institute");

const getAllResults = async (limit = 10, offset = 0) => {
  try {
    const results = await Result.findAll({
      where: { voided: false },
      limit,
      offset,
    });
    const totalCount = await Result.count({
      where: { voided: false },
    });

    return { results, totalCount };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch results.");
  }
};

const getResultById = async (id) => {
  try {
    const data = await Result.findOne({
      where: { id, voided: false },
    });
    if (!data) throw new Error("Result not found.");
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
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
    throw new Error(error.message || "Failed to create result.");
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
    throw new Error(error.message);
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
    throw new Error(error.message || "Failed to delete result.");
  }
};

const getResultsPerInstitute = async (limit = 10, offset = 0) => {
  try {
    console.log(limit, offset);
    const institutes = await Institute.findAll({
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
          },
        ],
      },
      limit,
      offset,
    });
    const totalInstitutes = await Institute.count({
      where: { voided: false },
    });

    return {
      institutes,
      totalCount: totalInstitutes,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch results per institute.");
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
