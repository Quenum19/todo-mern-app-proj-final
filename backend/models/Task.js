// backend/models/Task.js
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Veuillez ajouter un titre pour la tâche'],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    dueDate: {
      type: Date,
      required: false,
    },
    user: { // TRÈS IMPORTANT : Lier la tâche à un utilisateur
      type: mongoose.Schema.Types.ObjectId,
      required: true, // L'utilisateur est maintenant requis
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);