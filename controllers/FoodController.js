const foodModel = require("../models/foodModel");

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    } = req.body;

    if (!title || !description || !price || !resturant) {
      return res.status(400).send({
        success: false,
        message: "Please provide all the fields",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    });
    await newFood.save();
    res
      .status(200)
      .send({ success: true, message: "New food Item created", newFood });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Create Food API", error });
  }
};

const getAllFoodController = async (req, res) => {
  try {
    const food = await foodModel.find();
    if (!food.length) {
      res.status(400).send({ success: false, message: "No food found" });
    }
    res
      .status(200)
      .send({ success: true, message: "Successfully retrieved Foods", food });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Gat All Food API.", error });
  }
};

const getSingleFoodByIDController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res
        .status(404)
        .send({ success: false, message: "Please provide an Id" });
    }

    const food = await foodModel.findById(foodId);

    if (!food) {
      return res
        .status(404)
        .send({ success: false, message: "No food found with this ID" });
    }

    res.status(200).send({
      success: true,
      message: "Successfully retrieved the food",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in the Get Single Food By ID API",
    });
  }
};

const getSingleFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res
        .status(404)
        .send({ success: false, message: "Please provide Id" });
    }

    const food = await foodModel.find({ resturant: resturantId });

    if (!food) {
      return res
        .status(404)
        .send({ success: false, message: "No food found with this ID" });
    }

    res
      .status(200)
      .send({ success: true, message: "Successfully retrieved food", food });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Single By Resturant API",
      error,
    });
  }
};

const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res
        .status(404)
        .send({ success: false, message: "No food was found with Id" });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({ success: false, message: "No food found" });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    } = req.body;

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        resturant,
        rating,
      },
      { new: true },
    );

    res.status(200).send({ success: true, message: "Food item was updated." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in update Food API" });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  updateFoodController,
  getSingleFoodByIDController,
  getSingleFoodByResturantController,
};
