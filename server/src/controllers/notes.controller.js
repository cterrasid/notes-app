const notesControllers = {};

notesControllers.getNotes = (req, res) => res.json({ message: [] });
notesControllers.createNote = (req, res) =>
  res.json({ message: "Note created" });

module.exports = notesControllers;
