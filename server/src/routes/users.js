// Creo un objeto Router de express
const { Router } = require("express");
const router = Router();

const {
  getUsers,
  createUser,
  deleteUser
} = require("../controllers/users.controller");
router.route("/").get((req, res) => res.send("Users"));

router.route("/:id").get(getUsers);

module.exports = router;
