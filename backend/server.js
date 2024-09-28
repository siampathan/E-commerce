import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";

const app = express();
const port = process.env.port || 8000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

// API endpoint
app.get("/", (req, res) => {
  res.send("Hello, Siam Welcome in Express Server...");
});

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

app.listen(port, () => {
  console.log("server is Runing at port: ", port);
});
