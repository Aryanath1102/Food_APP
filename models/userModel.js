const mongoose = require("mongoose");

// Schema

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
    },
    usertype: {
      type: String,
      required: [true, "user type is required."],
      default: "client",
      enum: ["client", "admin", "vendor", "drive"],
    },
    profile: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png",
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },

  { timestamps: true },
);
// export
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
