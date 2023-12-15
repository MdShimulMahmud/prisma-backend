const prisma = require("../common/prisma");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await prisma.user.findUnique({
          where: {
            id: decoded?.id,
          },
        });

        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized token expired, Please Login again");
    }
  } else {
    throw new Error(" There is no token attached to header");
  }
};

const isAdmin = async (req, res, next) => {
  const { email } = req.user;
  console.log(req.user);
  const adminUser = await prisma.user.findUnique({ where: { email } });
  if (adminUser.role !== "ADMIN" || adminUser.role !== "SELLER") {
    throw new Error("You are not an admin or seller!");
  } else {
    next();
  }
};

module.exports = { authMiddleware, isAdmin };
