const express = require("express");
const {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const BookModel = require("../models/bookModel");
// const requireAuth = require("../middleware/requireAuth");
// const requireAdmin = require("../middleware/requireAdmin");

const router = express();

// create a book
router.post("/", createBook);

// get all books
router.get("/", getBooks);

// get a book
router.get("/:id", getBook);

// update a book
router.put("/:id", updateBook);

// delete a book
router.delete("/:id", deleteBook);

module.exports = router;
