const prisma = require("../common/prisma");
// create a new user

const createUser = async (req, res) => {
  // const { name, email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all users
const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
};

// get a single user
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      profile: true,
    },
  });
  res.status(200).json(user);
};

// update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name,
      email,
      password,
    },
  });
  res.status(200).json(user);
};

// delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json(user);
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
