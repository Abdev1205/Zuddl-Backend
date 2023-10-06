const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  userName: String,
  userProfile: String,
  boards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
  }],
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema)