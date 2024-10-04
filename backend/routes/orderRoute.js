import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";
import {
  placeOrder,
  placeOrderStrip,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../controllers/orderControllers.js";
import authUser from "../middleware/userAuth.js";

const orderRouter = express.Router();

//feture for Admin
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//payment Feature
orderRouter.post("/place", userAuth, placeOrder);
orderRouter.post("/stripe", userAuth, placeOrderStrip);

//user Feature
orderRouter.post("/userorders", userAuth, userOrders);

//verify Route
orderRouter.post("/verifystripe", authUser, verifyStripe);

export default orderRouter;
