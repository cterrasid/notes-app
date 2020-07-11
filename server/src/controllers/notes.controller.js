const notesControllers = {};

const Note = require("../models/Note");

// Get All the notes
notesControllers.getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

// Create one note
notesControllers.createNote = async (req, res) => {
  const { title, content, date, author } = req.body;
  const newNote = new Note({
    title,
    content,
    date,
    author
  });
  await newNote.save();

  res.json({ message: "Note created" });
};

// Get one specific note by id
notesControllers.getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
};

// Update one specific note by id
notesControllers.updateNote = async (req, res) => {
  const { title, content, author } = req.body;
  await Note.findOneAndUpdate(req.params.id, {
    title,
    content,
    author
  });
  res.json({ message: "Note updated" });
};

// Delete one specific note by id
notesControllers.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
};

module.exports = notesControllers;
