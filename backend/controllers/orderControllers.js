import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//placing Order using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      pyment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

//placing Order using Strip Method
const placeOrderStrip = (req, res) => {};

//all orders Data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

//user Order data for Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

//update order status for Admin
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export { placeOrder, placeOrderStrip, allOrders, userOrders, updateStatus };
