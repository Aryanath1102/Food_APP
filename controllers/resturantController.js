const resturantModel = require("../models/resturantModel");
const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    if (!title || !coords) {
      return res
        .status(500)
        .send({ success: false, message: "Please provide title and address." });
    }
    const newResturant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newResturant.save();
    res.status(201).send({
      success: true,
      message: "New Resturant Created Successfully.",
      newResturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Resturant API",
      error,
    });
  }
};

const GetAllResturantController = async (req, res) => {
  try {
    const resturant = await resturantModel.find();
    if (!resturant.length) {
      return res.status(404).send({
        success: false,
        message: "No Resturant  Found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully Found the Resturant.",
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all API",
      error,
    });
  }
};

const GetResturantController = async (req, res) => {
  try {
    const resturant = await resturantModel.findById(req.params.id);
    if (!resturant) {
      res.status(404).send({
        success: false,
        message: "Resturant not found.",
      });
    }
    res.status(201).send({
      success: true,
      message: "Successfully Found the Resturant",
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Restutant by Id API",
    });
  }
};

module.exports = {
  createResturantController,
  GetAllResturantController,
  GetResturantController,
};
