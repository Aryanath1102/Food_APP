const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, usertype, answer } =
      req.body;

    // Validation
    if (!userName || !email || !password || !phone || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all details",
      });
    }

    //   chk user
    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email Already Registered, please Login",
      });
    }

    // hashing passwordc
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //   create User
    const user = await UserModel.create({
      userName,
      email,
      password: hashedPassword,
      phone,
      address,
      usertype,
      answer,
    });

    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(500).send({
        success: false,
        message: "Please provide Email OR Password",
        error,
      });
    }
    //  check User
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not found OR Password mismatch",
      });
    }

    // check user password ||   compare password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid password",
      });
    }

    // TOKEN
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
