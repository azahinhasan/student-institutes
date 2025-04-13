const Institute = require("../../models/Institute");

const getAllInstitutes = async () => {
  try {
    return await Institute.findAll();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch institutes.");
  }
};

const getInstituteById = async (id) => {
  try {
    return await Institute.findByPk(id);
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
    const institute = await Institute.findByPk(id);
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
    const institute = await Institute.findByPk(id);
    if (!institute) {
      throw new Error("Institute not found.");
    }
    await institute.destroy();
    return `Institute with ID ${id} deleted successfully.`;
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
