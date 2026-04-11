const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  noteId: String,
  views: { type: Number, default: 0 }
});

module.exports = mongoose.model("Note", noteSchema);