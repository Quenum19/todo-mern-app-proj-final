// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Assurez-vous que l'utilisateur est bien trouvé et attaché
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) { // Ajout de cette vérification
        return res.status(401).json({ message: 'Non autorisé, utilisateur non trouvé' });
      }

      next();
    } catch (error) {
      console.error(error); // Affiche l'erreur ici pour le débogage
      return res.status(401).json({ message: 'Non autorisé, token invalide' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé, pas de token' });
  }
};

module.exports = protect;