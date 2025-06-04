// backend/server.js
const express = require('express');
const dotenv = require('dotenv').config(); // Charge les variables d'environnement
const cors = require('cors');
const connectDB = require('./config/db'); // Importe la fonction de connexion à la DB

// Connecte à la base de données
connectDB();

const app = express();
const port = process.env.PORT || 5000; // Utilise le port défini dans .env ou 5000 par défaut

// Middlewares pour parser le JSON et les données d'URL
app.use(express.json()); // Permet de recevoir du JSON dans les requêtes (body-parser pour JSON)
app.use(express.urlencoded({ extended: false })); // Permet de recevoir des données encodées dans l'URL

// Middleware CORS pour autoriser les requêtes du frontend
app.use(cors());

// --- Routes de base (à étendre plus tard) ---
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Bienvenue sur l\'API To-Do List MERN !' });
});

// Exemple de route pour les tâches (sera remplacé par un routeur dédié)
app.use('/api/tasks', require('./routes/taskRoutes'));


app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});