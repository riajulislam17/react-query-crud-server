const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 7000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

const bookRoutes = require("./routes/bookRoute");
const userRoutes = require("./routes/userRoute");

// routes for book
app.use("/api/books", bookRoutes);

// routes for user
app.use("/api/users", userRoutes);

// connect to DB
mongoose
  .connect(`${process.env.MONGO_DB_URL}`)

  .then(() => {
    // listen for request
    app.listen(4000, () => {
      console.log("I on listen for port 4000 😎");
    });
  })
  .catch((error) => {
    console.log(error);
  });
