const express = require("express");
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getPost,
} = require("../controllers/postController");
const upload = require("../services/fileUpload");
// const multer = require("multer");
// const upload = multer({ dest: "public/posts" });
const router = express.Router();

router.get("/posts", getAllPosts);
router.post("/posts/:userId", upload.array("photos", 5), createPost);
router.get("/posts/:postId", getPost);
router.put("/posts/:postId", updatePost);
router.delete("/posts/:postId", deletePost);

module.exports = router;
