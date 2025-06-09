// backend/controllers/taskController.js
const Task = require('../models/Task'); // Assurez-vous que le chemin est correct
const User = require('../models/User'); // Importe le modèle User si ce n'est pas déjà fait

// @desc    Obtenir toutes les tâches de l'utilisateur connecté avec filtres et tri
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  const { status, search, sortBy, sortOrder } = req.query; // Récupère les paramètres de requête

  // La requête de base est toujours pour l'utilisateur connecté
  // req.user est attaché par le middleware 'protect'
  let query = { user: req.user.id };

  // 1. Filtrage par statut
  if (status && (status === 'pending' || status === 'completed')) {
    query.status = status;
  }

  // 2. Filtrage par recherche (titre ou description)
  if (search) {
    // Utilise l'opérateur OR de MongoDB pour rechercher dans plusieurs champs
    query.$or = [
      { title: { $regex: search, $options: 'i' } }, // Recherche insensible à la casse
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  // 3. Tri
  let sortOptions = {};
  // Champs valides pour le tri
  const validSortBy = ['title', 'dueDate', 'createdAt', 'status'];
  // Ordres de tri valides
  const validSortOrder = ['asc', 'desc'];

  let actualSortBy = 'createdAt'; // Tri par défaut
  let actualSortOrder = 'desc'; // Ordre par défaut (du plus récent au plus ancien)

  if (sortBy && validSortBy.includes(sortBy)) {
    actualSortBy = sortBy;
  }
  if (sortOrder && validSortOrder.includes(sortOrder)) {
    actualSortOrder = sortOrder;
  }

  // Configure l'objet de tri pour Mongoose
  sortOptions[actualSortBy] = actualSortOrder === 'asc' ? 1 : -1; // 1 pour ascendant, -1 pour descendant

  try {
    const tasks = await Task.find(query).sort(sortOptions);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches', error: error.message });
  }
};

// @desc    Créer une nouvelle tâche
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: 'Veuillez ajouter un titre à la tâche' });
  }

  const { title, description, dueDate, status } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      // Convertit la date d'échéance en objet Date si elle est fournie, sinon undefined
      dueDate: dueDate ? new Date(dueDate) : undefined,
      // Utilise le statut fourni ou 'pending' par défaut
      status: status || 'pending',
      // Associe la tâche à l'utilisateur connecté via son ID
      user: req.user.id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la tâche', error: error.message });
  }
};

// @desc    Mettre à jour une tâche
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    // Vérifier si l'utilisateur de la tâche correspond à l'utilisateur connecté
    // Assurez-vous que task.user et req.user.id sont bien des chaînes comparables
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Non autorisé à modifier cette tâche' });
    }

    // Pour gérer la date d'échéance dans req.body si elle est modifiée
    const updateData = { ...req.body };
    if (updateData.dueDate === '') { // Si la date est vidée par le frontend
      updateData.dueDate = undefined;
    } else if (updateData.dueDate) {
      updateData.dueDate = new Date(updateData.dueDate);
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updateData, {
      new: true, // Retourne le document modifié après la mise à jour
      runValidators: true, // Exécute les validateurs de schéma Mongoose lors de la mise à jour
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    // Gérer les erreurs de validation ou autres erreurs de base de données
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche', error: error.message });
  }
};

// @desc    Supprimer une tâche
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    // Vérifier si l'utilisateur de la tâche correspond à l'utilisateur connecté
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Non autorisé à supprimer cette tâche' });
    }

    // Supprime la tâche de la base de données
    await Task.deleteOne({ _id: req.params.id });

    res.status(200).json({ id: req.params.id, message: 'Tâche supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche', error: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};