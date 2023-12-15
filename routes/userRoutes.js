const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");
const upload = require("../services/fileUpload");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/users/register", createUser);
router.post("/users/login", loginUser);
router.get("/users/", getAllUsers);
router.get("/users/:id", authMiddleware, getUser);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, isAdmin, deleteUser);

module.exports = router;
