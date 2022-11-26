const BookModel = require("../models/bookModel");
const ObjectId = require("mongodb").ObjectId;

// create a book
const createBook = async (req, res) => {
  const { title, author, publisher, publishYear } = req.body;
  try {
    const book = await BookModel.create({
      title,
      author,
      publisher,
      publishYear,
    });
    res.status(200).json({
      book,
      message: "Book was inserted successfully!",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all books
const getBooks = async (req, res) => {
  try {
    const books = await BookModel.find({});
    res.status(200).json({
      books,
      message: "Books gets successfully!",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a book
const getBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.findById({ _id: id });
    if (!book) {
      return res.status(400).json({ error: "Not such a book." });
    } else {
      res.status(200).json({
        book,
        message: "Book gets successfully!",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a book
const updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: req.body?.title,
          author: req.body?.author,
          publisher: req.body?.publisher,
          publishYear: req.body?.publishYear,
        },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    if (!book) {
      return res.status(400).json({ error: "Not such a book." });
    } else {
      res.status(200).json({
        book,
        message: "Book update successfully!",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.findOneAndDelete({ _id: id });
    if (!book) {
      return res.status(400).json({ error: "Not such a book." });
    } else {
      res.status(200).json({
        book,
        message: "Book deleted successfully!",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
