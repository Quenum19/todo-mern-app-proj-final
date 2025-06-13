// backend/server.js
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware'); // Importe le middleware d'erreur

// Connecte à la base de données
connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Configurer CORS pour accepter les requêtes depuis Vercel
const corsOptions = {
  origin: [
    'http://localhost:5173', // développement local
    'https://mon-todo-mern-app.vercel.app' // votre domaine Vercel
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// --- Routes API ---
// Routes utilisateurs
app.use('/api/users', require('./routes/userRoutes'));
// Routes tâches (on utilisera l'authentification ici plus tard)
app.use('/api/tasks', require('./routes/taskRoutes'));

// Middleware de gestion d'erreurs (doit être le dernier middleware)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});