const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const port = process.env.PORT || 5000;

//parse options
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const blogRoutes = require("./src/routes/blog.route");
const commentRoutes = require("./src/routes/comment.route");
const userRoutes = require("./src/routes/auth.route");

app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", userRoutes);

async function main() {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected Successfully"));

  app.get("/", (req, res) => {
    res.send("Hotels Rooftop is running...");
  });

  app.listen(port, () => {
    console.log(`Example app running on port ${port}`);
  });
}

main().catch((err) => console.log("MongoDB Connection failed!", err));
