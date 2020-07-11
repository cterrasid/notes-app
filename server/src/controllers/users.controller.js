const userController = {};

const User = require("../models/User");

userController.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

userController.createUser = async (req, res) => {
  const { username } = req.body;
  const newUser = new User({
    username
  });
  await newUser.save();
  res.json("User created");
};

userController.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

userController.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json("User deleted");
};

module.exports = userController;
