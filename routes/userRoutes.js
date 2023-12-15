const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const upload = require("../services/fileUpload");

const router = express.Router();

router.post("/users/", createUser);
router.get("/users/", getAllUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
