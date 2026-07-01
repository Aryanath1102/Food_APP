const categoryModel = require("../models/categoryModel");
const category = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      res
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

module.exports = { createCategoryController };
