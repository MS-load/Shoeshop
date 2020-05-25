const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.get_all_users = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
}

exports.register_user = async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.body.username });
        if (!foundUser) {
            const password = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                username: req.body.username,
                password: password,
            });
            const newUser = await user.save();
            res.status(200).json(newUser);
        } else {
            res.status(403).send("User with that username already exist");
        }
    } catch (err) {
        res.json(err);
    }
}

exports.login_user = async (req, res) => {
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
}

exports.logout_user = async (req, res) => {
    try {
        req.session = null;
        res.status(200).send("Successfully logged out user");
    } catch {
        res.status(400).send("Could not log out user");
    }
}

exports.update_password_user = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
  
      const newPassword = await bcrypt.hash(req.body.password, 10);
  
      user.password = newPassword;
  
      await user.save();
  
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  }

exports.update_role_user = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      user.role = req.params.role;
      await user.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  }

exports.delete_user = async (req, res) => {
    try {
      await User.deleteOne({ _id: req.params.id });
      await GameResult.deleteMany({ user: req.params.id });
      res.status(200).send("User deleted");
    } catch (err) {
      res.status(400).json(err);
    }
  }