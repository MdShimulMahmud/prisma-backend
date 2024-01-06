const prisma = require("../common/prisma");
const bcrypt = require("bcryptjs");
const generateToken = require("../services/jwtTokenGenarate");
// create a new user

const createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (userExists) {
      res.status(400).json({ error: "User already exists!" });
    }

    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: bcrypt.hashSync(password, 10),
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
      include: {
        profile: true,
        book: true,
        posts: true,
      },
    });
    if (!user) {
      throw new Error("User does not exist");
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }

    let token = generateToken(user.id);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60,
      })
      .status(200)
      .json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// logout a user and clear cookie
const logoutUser = async (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logged out" });
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
      book: true,
      posts: true,
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
      ...req.body,
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
  loginUser,
  logoutUser,
};
