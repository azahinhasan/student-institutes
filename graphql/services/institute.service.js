const Institute = require("../../models/Institute");

const getAllInstitutes = async () => {
  try {
    return await Institute.findAll({
      where: {
        voided: false,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch institutes.");
  }
};

const getInstituteById = async (id) => {
  try {
    return await Institute.findOne({
      where: {
        id,
        voided: false,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Institute not found.");
  }
};

const createInstitute = async (name, address) => {
  try {
    const institute = await Institute.create({ name, address });
    return institute;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create institute.");
  }
};

const updateInstitute = async (id, name, address) => {
  try {
    const institute = await Institute.findOne({
      where: {
        id,
        voided: false,
      },
    });

    if (!institute) {
      throw new Error("Institute not found.");
    }

    institute.name = name || institute.name;
    institute.address = address || institute.address;
    await institute.save();
    return institute;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update institute.");
  }
};

const deleteInstitute = async (id) => {
  try {
    const institute = await Institute.findOne({
      where: {
        id,
        voided: false,
      },
    });

    if (!institute) {
      throw new Error("Institute not found or already deleted.");
    }

    institute.voided = true;
    await institute.save();

    return `Institute with ID ${id} marked as voided.`;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete institute.");
  }
};

module.exports = {
  getAllInstitutes,
  getInstituteById,
  createInstitute,
  updateInstitute,
  deleteInstitute,
};
