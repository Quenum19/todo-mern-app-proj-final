// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { getTasks, createTask } = require('../controllers/taskController');

// Définition des routes
router.route('/').get(getTasks).post(createTask);

// Vous pouvez aussi les écrire séparément :
// router.get('/', getTasks);
// router.post('/', createTask);

module.exports = router;