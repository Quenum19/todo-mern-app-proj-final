// backend/controllers/taskController.js
const Task = require('../models/Task');
// Le modèle User n'est pas directement nécessaire ici car req.user est passé par le middleware

// @desc    Obtenir toutes les tâches de l'utilisateur connecté
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  // Le middleware 'protect' a attaché l'objet user à la requête (req.user)
  const tasks = await Task.find({ user: req.user.id }); // Ne récupère que les tâches de l'utilisateur connecté

  res.status(200).json(tasks);
};

// @desc    Créer une nouvelle tâche
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: 'Veuillez ajouter un titre' });
  }

  const { title, description, dueDate } = req.body;

  const task = await Task.create({
    title,
    description,
    dueDate: dueDate ? new Date(dueDate) : undefined, // Convertit en Date si fourni
    user: req.user.id, // Assigne la tâche à l'utilisateur connecté
  });

  res.status(201).json(task);
};

module.exports = {
  getTasks,
  createTask,
};