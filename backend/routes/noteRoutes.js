const express = require("express");
const router = express.Router();
const Note = require("../models/note");

// 👉 GET views
router.get("/view/:noteId", async (req, res) => {
  const note = await Note.findOne({ noteId: req.params.noteId });
  if (!note) return res.json({ views: 0 });
  res.json({ views: note.views });
});

// 👉 POST increase
router.post("/view/:noteId", async (req, res) => {
  const id = req.params.noteId;

  let note = await Note.findOne({ noteId: id });

  if (!note) {
    note = new Note({ noteId: id, views: 1 });
  } else {
    note.views += 1;
  }

  await note.save();

  res.json({ views: note.views });
});

module.exports = router;