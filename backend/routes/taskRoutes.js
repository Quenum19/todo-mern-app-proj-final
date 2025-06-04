// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { getTasks, createTask } = require('../controllers/taskController');
const protect = require('../middleware/authMiddleware'); // Importe le middleware de protection

// Toutes les routes définies ci-dessous utiliseront le middleware 'protect'
router.route('/').get(protect, getTasks).post(protect, createTask);

// Vous pouvez aussi les écrire séparément :
// router.get('/', protect, getTasks);
// router.post('/', protect, createTask);

module.exports = router;