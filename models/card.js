const mongoose = require('mongoose')
const cardSchema = new mongoose.Schema({
  stageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stage',
    required: true,
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
  },
  title: String,
  visibility: String,
  desc: String,
  userEmail: {
    type: String,
    required: true,
  },
  priority: String,
  important: String,
}, { timestamps: true });

module.exports = mongoose.model('cards', cardSchema);