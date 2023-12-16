const prisma = require("../common/prisma");
const cloudinary = require("../services/cloudinary");

const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProfile = async (req, res) => {
  const { userId } = req.params;
  const { address, phone } = req.body;

  if (!req.file) {
    res.status(400).json({ error: "Please upload a file" });
  }
  try {
    const path = req.file.path;
    const result = await cloudinary.uploader.upload(path);
    const imageUrl = result.secure_url;
    console.log(imageUrl);
    const profile = await prisma.profile.create({
      data: {
        address,
        phone,
        imageUrl,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a profile
const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { address, phone } = req.body;

  try {
    const profile = await prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        address,
        phone,
      },
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a profile
const deleteProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await prisma.profile.delete({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  getProfile,
};
