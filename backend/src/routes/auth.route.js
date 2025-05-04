const express = require("express");
const User = require("../model/user.model");
const generateToken = require("../middleware/generateToken");

const router = express.Router();

//register a new user
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res
      .status(201)
      .send({ message: "User Registered Successfully!", user: user });
  } catch (error) {
    console.error("Failed to register", error);
    res.status(500).send({ message: "Registration Failed!" });
  }
});

//login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    // todo: generate token here
    const token = await generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true, //enable this only when the you have https://
      secure: true,
      sameSite: true,
    });
    res.status(200).send({
      message: "Login Successful!",
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Failed to login", error);
    res.status(500).send({ message: "Login Failed! Try Again" });
  }
});

// Logout a user
router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send({ message: "Logout Successfully done" });
  } catch (error) {
    console.error("Failed to logout", error);
    res.status(500).send({ message: "Logout Failed" });
  }
});

//get all users
router.get("/user", async (req, res) => {
  try {
    const users = await User.find({}, `id email role`);
    res.status(200).send({ message: "Users found successfully!", users });
  } catch (error) {
    console.error("Error Fetching user", error);
    res.status(500).send({ message: "Failed to fetch users!" });
  }
});

//delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      res.status(404).send({ message: "User not found!" });
    }

    res.status(200).send({ message: "User Deleted Successfully!" });
  } catch (error) {
    console.error("Error deleting users", error);
    res.status(500).send({ message: "Error deleting user!" });
  }
});

//update a user role
router.patch("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    res.status(200).send({ message: "user role updated successfully!", user });
  } catch (error) {
    console.error("Error Updating user role", error);
    res.status(500).send({ message: "Failed Updating user role" });
  }
});

module.exports = router;
