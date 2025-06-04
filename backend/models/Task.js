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
      enum: ['pending', 'completed'], // Statuts possibles
      default: 'pending',
    },
    dueDate: { // Nouvelle propriété pour l'échéance
      type: Date,
      required: false, // Pas obligatoire
    },
    user: { // Pour lier la tâche à un utilisateur (important pour l'authentification)
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Fait référence au modèle User (que nous créerons plus tard)
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  }
);

module.exports = mongoose.model('Task', taskSchema);