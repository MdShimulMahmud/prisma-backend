const prisma = require("../common/prisma");

const bookPost = async (req, res) => {
  const { postId } = req.params;
  const { seatCapacity } = req.body;

  try {
    const oldPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    let newSeatCapacity;
    if (oldPost.seatCapacity - seatCapacity < 0) {
      return res.status(400).json({
        error: "Seat capacity must be less than or equal to available seat",
      });
    }

    if (oldPost.seatCapacity - seatCapacity === 0) {
      newSeatCapacity = 0;
    } else {
      newSeatCapacity = oldPost.seatCapacity - seatCapacity;
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        seatCapacity: newSeatCapacity,
      },
    });

    const book = await prisma.book.create({
      data: {
        user: { connect: { id: req.user.id } },
        post: { connect: { id: postId } },
      },
    });

    res.status(201).json({
      message: "Successfully Updated!",
      updatedPost,
      book,
    });
  } catch (error) {
    res.status(403).json({
      error: error.message,
    });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await prisma.book.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        post: true,
      },
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { bookPost, getBook };
