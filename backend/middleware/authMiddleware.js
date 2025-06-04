// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Le token est généralement envoyé dans l'en-tête Authorization comme 'Bearer TOKEN'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extraire le token
      token = req.headers.authorization.split(' ')[1];

      // Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Récupérer l'utilisateur du token et l'ajouter à la requête
      // Le .select('-password') exclut le mot de passe de l'objet utilisateur retourné
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Passer au prochain middleware/route
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Non autorisé, token invalide' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé, pas de token' });
  }
};

module.exports = protect;