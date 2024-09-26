import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    //  Authorization header
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Condition Not Authorized try again.",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", token_decode);

    if (!token_decode.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not Authorized try again.",
      });
    }

    req.user = token_decode;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, message: err.message });
  }
};

export default adminAuth;
