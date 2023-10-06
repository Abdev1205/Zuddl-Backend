const mongoose = require('mongoose')
const stageSchema = new mongoose.Schema({
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
}, { timestamps: true });

module.exports = mongoose.model('stages', stageSchema);