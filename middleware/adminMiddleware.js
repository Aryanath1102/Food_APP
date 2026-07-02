const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    console.log("Decoded User:", req.user);

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.usertype !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Admin Access Only",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Unauthorized Access",
      error,
    });
  }
};
