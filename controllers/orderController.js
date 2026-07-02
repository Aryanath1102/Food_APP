const OrderModel = require("../models/OrderModel");
const orderModel = require("../models/OrderModel");

const placeOrderControoler = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart || !payment) {
      return res.status(500).send({
        success: false,
        message: "please food cart or payment method",
      });
    }
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new OrderModel({
      food: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res
      .status(200)
      .send({ success: true, message: "Order placed Successfully.", newOrder });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: true, message: "Error in Place Order API.", error });
  }
};

const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res
        .status(404)
        .send({ success: false, message: "Please provide a valid Id" });
    }

    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );
    res.status(200).send({ success: true, message: "Order status updated" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Order Status API.", error });
  }
};

module.exports = { placeOrderControoler, orderStatusController };
