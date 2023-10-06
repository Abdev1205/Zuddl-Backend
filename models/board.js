const mongoose = require('mongoose')
const boardSchema = new mongoose.Schema({
  boardTitle: {
    type: String,
    required: true,
  },
  visibility: String,
  desc: String,
  userEmail: {
    type: String,
    required: true,
  },
  background: String,
  stages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stage',
  }],
}, { timestamps: true });

module.exports = mongoose.model('boards', boardSchema);