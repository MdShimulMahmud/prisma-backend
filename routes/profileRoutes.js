const express = require("express");
const upload = require("../services/fileUpload");
const {
  createProfile,
  updateProfile,
  deleteProfile,
  getProfile,
} = require("../controllers/profileController");

const router = express.Router();

router.get("/profile/:userId", getProfile);
router.post("/profile/:userId", upload.single("image"), createProfile);
router.put("/profile/:userId", updateProfile);
router.delete("/profile/:userId", deleteProfile);

module.exports = router;
