const express = require("express");
const Blog = require("../model/blog.model");
const Comment = require("../model/comment.model");
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();

//create a blog post
router.post("/create-post", verifyToken, isAdmin, async (req, res) => {
  try {
    // Ensure that req.userId is available. This is typically set by a middleware after authentication
    const newPost = new Blog({ ...req.body, author: req.userId }); //todo: use author:req.userId, when you have token verified

    // // Validate if the author is available before saving
    if (!req.userId) {
      return res.status(400).send({ message: "User ID is required!" });
    }

    await newPost.save();
    res
      .status(201)
      .send({ message: "Post Created Successfully!", post: newPost });
  } catch (error) {
    console.error("Error creating post: ", error);
    res.status(500).send({ message: "Error creating post" });
  }
});

//get all blogs
router.get("/", async (req, res) => {
  try {
    const { search, category, location } = req.query;

    let query = {};

    if (search) {
      query = {
        ...query,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
        ],
      };
    }

    if (category) {
      query = {
        ...query,
        category: category,
      };
    }

    if (location) {
      query = {
        ...query,
        location: location,
      };
    }

    const posts = await Blog.find(query)
      .populate("author", "email")
      .sort({ createdAt: -1 });
    res.status(200).send(posts);
  } catch (error) {
    console.error("Error getting all post: ", error);
    res.status(500).send({ message: "Error getting all post" });
  }
});

//get single blog by id
router.get("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Blog.findById(postId);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    const comment = await Comment.find({ postId: postId }).populate(
      "user",
      "username email"
    );

    res.status(200).send({ post, comment });
  } catch (error) {
    console.error("Error Fetching single post", error);
    res.status(500).send({ message: "Error Fetching single post" });
  }
});

//update a blog post
router.patch("/update-post/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await Blog.findByIdAndUpdate(
      postId,
      {
        ...req.body,
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).send({ message: "Post not found" });
    }
    res
      .status(200)
      .send({ message: "Post Updated Successfully!", post: updatedPost });
  } catch (error) {
    console.error("Error updating post: ", error);
    res.status(500).send({ message: "Error updating post" });
  }
});

//delete a blog post
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Blog.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    //delete related comments
    await Comment.deleteMany({ postId: postId });

    res.status(200).send({
      message: "Post deleted Successfully",
      post: post,
    });
  } catch (error) {
    console.error("Error deleting post: ", error);
    res.status(500).send({ message: "Error deleting post" });
  }
});

router.get("/related/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.status(400).send({ message: "Post id is required" });
    }

    const blog = await Blog.findById(postId);
    if (!blog) {
      return res.status(404).send({ message: "Post not found" });
    }

    // Check if the blog has a category
    if (!blog.category) {
      return res.status(400).send({ message: "Blog category not found" });
    }

    // Filter related blogs by category, excluding the current blog by _id
    const relatedQuery = {
      _id: { $ne: postId },
      category: { $regex: new RegExp(`^${blog.category}$`, "i") },
    };

    const relatedPosts = await Blog.find(relatedQuery).limit(5);
    res.status(200).send(relatedPosts);
  } catch (error) {
    console.error("Error fetching related posts: ", error);
    res.status(500).send({ message: "Error fetching related posts" });
  }
});

module.exports = router;
