// backend/controllers/userController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Génère un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Le token expire après 1 heure
  });
};

// @desc    Inscrire un nouvel utilisateur
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Veuillez entrer tous les champs' });
  }

  // Vérifier si l'utilisateur existe déjà
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
  }

  // Hacher le mot de passe
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Créer l'utilisateur
  const user = await User.create({
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id), // Générer un token pour l'utilisateur
    });
  } else {
    res.status(400).json({ message: 'Données utilisateur invalides' });
  }
};

// @desc    Connecter un utilisateur
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Vérifier l'email de l'utilisateur
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id), // Générer un token pour l'utilisateur
    });
  } else {
    res.status(400).json({ message: 'Identifiants invalides' });
  }
};

// @desc    Obtenir les données de l'utilisateur courant
// @route   GET /api/users/me
// @access  Private (nécessite une authentification par token)
const getMe = async (req, res) => {
  // req.user est défini par le middleware d'authentification
  res.status(200).json(req.user);
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};