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

router.get("/profile", authMiddleware, verifyUser, getProfile);
router.post(
  "/profile/create",
  authMiddleware,
  verifyUser,
  upload.single("image"),
  createProfile
);
router.put("/profile/edit", authMiddleware, verifyUser, updateProfile);

/// for admin
router.get("/admin/profile", authMiddleware, isAdmin, getProfile);
router.delete("/admin/profile/delete", authMiddleware, isAdmin, deleteProfile);

module.exports = router;
