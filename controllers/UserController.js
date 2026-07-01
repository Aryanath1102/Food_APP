// Get User info
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");

const getUserController = async (req, res) => {
  try {
    // Find User
    const user = await UserModel.findById({ _id: req.user.id });

    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    // hide password
    user.password = undefined;

    // resp
    res.status(200).send({
      success: true,
      message: "User get Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET User API",
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    // Find User
    const user = await UserModel.findById({ _id: req.user.id });

    // Validation
    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // update User
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    // Save user
    await user.save();

    res.status(200).send({
      success: true,
      message: "User updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in PUT User API",
    });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    const user = await UserModel.findById({ _id: req.user.id });
    // Validation
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }

    // Get user from data
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please provide old or new Password",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return req.status(400).send({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    await user.save();

    res.status(200).send({
      success: true,
      message: "Successfully updated password.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in PUT Update Password API",
      error,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;

    if (!email || !newPassword || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please provide email, new password & answer",
      });
    }
    const user = await UserModel.findOne({ email, answer });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found or invalid answer",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    // user.password = await bcrypt.hash(newPassword, salt);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Reset Password API",
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete({ _id: req.user.id });
    return res.status(200).send({
      success: true,
      message: "Successfully Deleted user",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in DELETE user API",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController,
};
