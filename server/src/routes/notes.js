// Creo un objeto Router de express
const { Router } = require("express");
const router = Router();

const { getNotes, createNote } = require("../controllers/notes.controller");

router.route("/").get(getNotes).post(createNote);

router.route("/:id").get(getNotes);

module.exports = router;
