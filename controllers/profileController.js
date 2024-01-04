const prisma = require("../common/prisma");
const cloudinary = require("../services/cloudinary");

const getProfile = async (req, res) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: req.user.id,
      },
      include: {
        user: true,
      },
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProfile = async (req, res) => {
  // if (!req.file) {
  //   res.status(400).json({ error: "Please upload a file" });
  // }
  const { address, phone, images } = req.body;
  try {
    // const path = req.file.path;
    // const result = await cloudinary.uploader.upload(path);
    // const imageUrl = result.secure_url;
    // console.log(imageUrl);

    const profile = await prisma.profile.create({
      data: {
        address,
        phone,
        images,
        user: {
          connect: {
            id: req.user.id,
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
  const { address, phone } = req.body;

  try {
    const profile = await prisma.profile.update({
      where: {
        userId: req.user.id,
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
  try {
    const profile = await prisma.profile.delete({
      where: {
        userId: req.user.id,
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
