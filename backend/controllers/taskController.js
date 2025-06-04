// backend/controllers/taskController.js
const Task = require('../models/Task'); // Importe le modèle Task

// @desc    Obtenir toutes les tâches
// @route   GET /api/tasks
// @access  Public (pour le moment, sera privé après l'auth)
const getTasks = async (req, res) => {
  // Pour l'instant, renvoie juste un message de test
  // Plus tard, on fera : const tasks = await Task.find({ user: req.user.id });
  res.status(200).json({ message: 'Endpoint getTasks accessible !' });
};

// @desc    Créer une nouvelle tâche
// @route   POST /api/tasks
// @access  Public (pour le moment, sera privé après l'auth)
const createTask = async (req, res) => {
  // Pour l'instant, renvoie juste ce qui a été reçu
  // Plus tard, on fera : const task = await Task.create({ ...req.body, user: req.user.id });
  if (!req.body.title) {
    return res.status(400).json({ message: 'Veuillez ajouter un titre' });
  }
  res.status(201).json({ message: 'Endpoint createTask accessible !', data: req.body });
};

module.exports = {
  getTasks,
  createTask,
};