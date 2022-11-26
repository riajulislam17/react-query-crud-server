const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireAdmin = async (req, res, next) => {
  // verify user is authenticated
  const { Authorization } = req.headers;

  if (!Authorization) {
    return res.status(401).json({ error: "Unauthorized User" });
  }

  const token = Authorization.split(" ")[1];

  try {
    const { email } = jwt.verify(token, "SECRET_KEY");

    req.user = await UserModel.findOne({ email });
    if (req.user.role === "admin") {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: "Unauthorized User" });
  }
};

module.exports = requireAdmin;
