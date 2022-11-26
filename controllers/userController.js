const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserModel = require("../models/userModel");

// signup controller
const signupUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  try {
    const user = await UserModel.signup(email, password, confirmPassword);
    res.status(200).json({ message: "Signup Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = jwt.sign(
      {
        _id,
      },
      `${process.env.USER_TOKEN}`,
      { expiresIn: "1d" }
    );

    res.status(200).json({ email, token, message: "Login Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
