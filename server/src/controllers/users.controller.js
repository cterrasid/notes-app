const userController = {};

userController.getUsers = (req, res) => res.json({ message: [] });
userController.createUser = (req, res) => res.json({ message: "User created" });
userController.deleteUser = (req, res) => res.json({ message: "User deleted" });

module.exports = userController;
