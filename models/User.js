const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type: String,

  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'project manager', 'contractor', 'supervisor'],
    default: 'project_manager',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
