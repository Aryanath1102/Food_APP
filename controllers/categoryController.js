const categoryModel = require("../models/categoryModel");
const category = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res
        .status(400)
        .send({ success: false, message: "Please provide image or title" });
    }
    const category = new categoryModel({ title, imageUrl });
    await category.save();
    res
      .status(200)
      .send({ success: true, message: "Successfully Created Category" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Category API",
      error,
    });
  }
};

const getCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find();

    if (!category.length) {
      return res
        .status(404)
        .send({ success: false, message: "No category Found" });
    }
    res.status(201).send({
      success: true,
      message: "Successfully retrived categories.",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Category Controller API",
      error,
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true },
    );

    if (!updatedCategory) {
      return res.status(400).send({
        success: false,
        message: "No category found.",
      });
    }
    res.status(200).send({
      success: true,
      message: "Successfully updated the Category",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Category Controller",
      error,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const categoryId = await req.params.id;
    if (!categoryId) {
      res.status(400).send({
        success: false,
        message: "No category found with the Id provided.",
      });
    }
    await categoryModel.findByIdAndDelete(categoryId);
    res
      .status(200)
      .send({ success: true, message: "Successfully Deleted the Categrory." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Delete Category API" });
  }
};

module.exports = {
  createCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
