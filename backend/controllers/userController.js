import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// {
//   "name": "Mahadi Hassan Siam Pathan",
//   "email":"siampathan005@gmail.com",
//   "password": "SiaMp7ThAn"
// }

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      res.json({ success: false, message: "User doesn't exists." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ sucess: false, message: "Invild credentials" });
    }
  } catch (err) {
    console.log(err.message);
    res.json({ sucess: false, message: err.message });
  }
};

//Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checking already exists or not
    const exists = await userModel.findOne({ email });
    if (exists)
      return res.json({ success: false, message: "User already exists." });

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter a valid Email.",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please Enter a Strong Password.",
      });
    }

    //hasing user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

//Route for admin login
const adminLogin = async (req, res) => {};

export { loginUser, registerUser, adminLogin };
