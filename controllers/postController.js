const prisma = require("../common/prisma");

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a post by id
const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: true,
      },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const {
      title,
      photos,
      price,
      seatCapacity,
      type,
      available,
      contact,
      details,
      location,
      coordinates,
    } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        photos: req.files.map((file) => file.path),
        price: parseInt(price),
        seatCapacity: parseInt(seatCapacity),
        type,
        available,
        contact,
        details,
        location,
        coordinates,
        user: {
          connect: {
            id: req.params.userId,
          },
        },
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update post
const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const { seatCapacity } = req.body;

    const oldPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    let newSeatCapacity, newAvailable;
    if (oldPost.seatCapacity - seatCapacity < 0) {
      return res.status(400).json({
        error: "Seat capacity must be less than or equal to available seat",
      });
    }

    if (oldPost.seatCapacity - seatCapacity === 0) {
      newSeatCapacity = 0;
      newAvailable = false;
    } else {
      newSeatCapacity = oldPost.seatCapacity - seatCapacity;
    }

    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        available: newAvailable,
        seatCapacity: newSeatCapacity,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete post
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getPost,
};
