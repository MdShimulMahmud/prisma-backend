const express = require("express");
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getPost,
} = require("../controllers/postController");
const upload = require("../services/fileUpload");
const {
  authMiddleware,
  verifyUser,
  verifySeller,
  isAdmin,
} = require("../middlewares/authMiddleware");
// const multer = require("multer");
// const upload = multer({ dest: "public/posts" });
const router = express.Router();

router.get("/posts", getAllPosts);
router.post(
  "/posts",
  authMiddleware,
  verifyUser,
  verifySeller,
  upload.array("photos", 5),
  createPost
);

router.get("/posts/:postId", getPost);
router.put("/posts/:postId", authMiddleware, verifySeller, updatePost);
router.delete("/posts/:postId", authMiddleware, verifySeller, deletePost);

// for admin

// router.post(
//   "/posts",
//   authMiddleware,
//   isAdmin,
//   upload.array("photos", 5),
//   createPost
// );
router.put("/posts/:postId", authMiddleware, isAdmin, updatePost);
router.delete(
  "/posts/:postId",
  authMiddleware,
  verifySeller,
  isAdmin,
  deletePost
);

module.exports = router;
