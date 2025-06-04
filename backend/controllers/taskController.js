// backend/controllers/taskController.js
const Task = require('../models/Task');

// @desc    Obtenir toutes les tâches de l'utilisateur connecté
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.status(200).json(tasks);
};

// @desc    Créer une nouvelle tâche
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: 'Veuillez ajouter un titre' });
  }

  const { title, description, dueDate, status } = req.body; // Ajout de status pour flexibilité

  const task = await Task.create({
    title,
    description,
    dueDate: dueDate ? new Date(dueDate) : undefined,
    status: status || 'pending', // Utilise le statut fourni ou 'pending' par défaut
    user: req.user.id,
  });

  res.status(201).json(task);
};

// @desc    Mettre à jour une tâche
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Tâche non trouvée' });
  }

  // Vérifier si l'utilisateur de la tâche correspond à l'utilisateur connecté
  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'Non autorisé à modifier cette tâche' });
  }

  // Optionnel: Empêcher la mise à jour si le titre est vide
  if (req.body.title === '') {
    return res.status(400).json({ message: 'Le titre ne peut pas être vide' });
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Retourne le document modifié
    runValidators: true, // Exécute les validateurs définis dans le schéma
  });

  res.status(200).json(updatedTask);
};

// @desc    Supprimer une tâche
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Tâche non trouvée' });
  }

  // Vérifier si l'utilisateur de la tâche correspond à l'utilisateur connecté
  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'Non autorisé à supprimer cette tâche' });
  }

  await Task.deleteOne({ _id: req.params.id }); // Ou task.remove(); si vous utilisez une ancienne version de Mongoose

  res.status(200).json({ id: req.params.id, message: 'Tâche supprimée avec succès' });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};