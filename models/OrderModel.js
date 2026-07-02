const mongoose = require("mongoose");

// Schema
const OrderSchema = new mongoose.Schema(
  {
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Foods",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["preparing", "prepared", "On the way", "delivered"],
      default: "preparing",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", OrderSchema);
