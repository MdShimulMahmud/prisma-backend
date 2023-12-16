const express = require("express");
const upload = require("../services/fileUpload");
const {
  createProfile,
  updateProfile,
  deleteProfile,
  getProfile,
} = require("../controllers/profileController");
const {
  authMiddleware,
  verifyUser,
  isAdmin,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile/:userId", authMiddleware, verifyUser, getProfile);
router.post(
  "/profile/:userId",
  authMiddleware,
  verifyUser,
  upload.single("image"),
  createProfile
);
router.put("/profile/:userId", authMiddleware, verifyUser, updateProfile);
router.delete("/profile/:userId", authMiddleware, verifyUser, deleteProfile);

/// for admin
router.get("/profile/:userId", authMiddleware, isAdmin, getProfile);
router.delete("/profile/:userId", authMiddleware, isAdmin, deleteProfile);

module.exports = router;
