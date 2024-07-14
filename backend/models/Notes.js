const mongoose = require('mongoose');

const NotesSchema = new Schema({
      title: {
        type: String,
        require: true
      },
      description: {
        type: string,
        require: true
      },
      tag: {
        type: string,
        default: 'general'
      },
      date: {
        type: date,
        default: Date.now
      },
  });

  module.exports = mongoose.model('notes', 'NotesSchema');