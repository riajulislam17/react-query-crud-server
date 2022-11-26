const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  confirmPassword: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

// static signup method
userSchema.statics.signup = async function (email, password, confirmPassword) {
  const exists = await this.findOne({ email }); // this= userSchema
  // Duplicate validation
  if (!email || !password) {
    throw Error("Email & Password must be not empty");
  }
  if (exists) {
    throw Error("User already Exists");
  }

  if (password === confirmPassword) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.create({ email, password: hashedPassword });
    return user;
  } else {
    throw Error("Invalid Password");
  }
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Invalid User");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid User");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
