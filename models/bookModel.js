const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  publisher: {
    type: String,
    require: true,
  },
  publishYear: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Book", bookSchema);
