// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Veuillez ajouter un email'],
      unique: true, // L'email doit être unique
    },
    password: {
      type: String,
      required: [true, 'Veuillez ajouter un mot de passe'],
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt
  }
);

module.exports = mongoose.model('User', userSchema);