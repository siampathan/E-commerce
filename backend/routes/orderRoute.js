import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";
import {
  placeOrder,
  placeOrderStrip,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderControllers.js";

const orderRouter = express.Router();

//feture for Admin
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//payment Feature
orderRouter.post("/place", userAuth, placeOrder);
orderRouter.post("/strip", userAuth, placeOrderStrip);

//user Feature
orderRouter.post("/userorders", userAuth, userOrders);

export default orderRouter;
