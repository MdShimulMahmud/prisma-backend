const express = require("express");

const {
  isAdmin,
  authMiddleware,
  verifyUser,
} = require("../middlewares/authMiddleware");
const { bookPost, getBook } = require("../controllers/bookController");

const router = express.Router();

router.get("/books", authMiddleware, verifyUser, getBook);
router.post("/books/:postId", authMiddleware, verifyUser, bookPost);

module.exports = router;
