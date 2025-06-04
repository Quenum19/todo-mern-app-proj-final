// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const protect = require('../middleware/authMiddleware');

// Routes pour obtenir toutes les tâches et créer une nouvelle tâche
router.route('/').get(protect, getTasks).post(protect, createTask);

// Routes pour modifier et supprimer une tâche spécifique par son ID
router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;