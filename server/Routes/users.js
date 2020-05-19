const express = require("express");
const User = require("../models/User");

const router = express.Router();
const bcrypt = require("bcrypt");
const adminCheck = require("./admin");

router.use(express.json());

// Get
router.get("/", adminCheck, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Register user
router.post("/register", async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    if (!foundUser) {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        username: req.body.username,
        password: password,
        // role: "customer",
      });
      const newUser = await user.save();
      res.status(200).json(newUser);
    } else {
      res.status(403).send("User with that username already exist");
    }
  } catch (err) {
    res.json(err);
  }
});

// Login user
router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.loggedinusername });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json("Wrong username or password");
  }

  req.session.username = user.username;
  if (user.role === "admin") {
    req.session.role = "admin";
  } else {
    req.session.role = "customer";
  }

  //Send response
  res.status(200).json(user);
});

//Logout user
router.post("/logout", async (req, res) => {
  try {
    req.session = null;
    res.status(200).send("Successfully logged out user");
  } catch {
    res.status(418).send("Could not log out user");
  }
});

// Update user password
router.put("/:id", adminCheck, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    const newPassword = await bcrypt.hash(req.body.password, 10);

    user.password = newPassword;

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update user role
router.put("/:id/:role", adminCheck, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    user.role = req.params.role;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete user
router.delete("/:id", adminCheck, async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    await GameResult.deleteMany({ user: req.params.id });

    res.status(200).send("User deleted");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
