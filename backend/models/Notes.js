const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const notesSchema = new Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
  },
      title: {
        type: String,
        require: true
      },
      description: {
        type: String,
        require: true
      },
      tag: {
        type: String,
        default: 'general'
      },
      date: {
        type: Date,
        default: Date.now
      },
  });

  const Notes = mongoose.model('notes', notesSchema);
  Notes.createIndexes();

  module.exports = Notes;