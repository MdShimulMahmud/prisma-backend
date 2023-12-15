const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const userRouter = require("./routes/userRoutes");
const profileRouter = require("./routes/profileRoutes");
const postRouter = require("./routes/postRoutes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(userRouter);
app.use(profileRouter);
app.use(postRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
