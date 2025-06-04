// frontend/src/pages/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Nous allons installer axios

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_REACT_APP_API_URL; // Récupère l'URL de l'API

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/users/register`, { email, password });
      setSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      // Optionnel: rediriger après un court délai
      // setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '450px', borderRadius: '10px' }}>
        <div className="text-center mb-4">
          <h1 className="display-5 text-primary fw-bold">Ma Super To-Do App</h1>
          <p className="text-muted">Inscrivez-vous pour organiser vos tâches.</p>
        </div>
        <h2 className="card-title text-center mb-4 h4">Inscription</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {success && <div className="alert alert-success text-center">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control form-control-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="Entrez votre email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe:</label>
            <input
              type="password"
              id="password"
              className="form-control form-control-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="Choisissez un mot de passe"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label">Confirmer le mot de passe:</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control form-control-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="Confirmez votre mot de passe"
            />
          </div>
          <button
            type="submit"
            className="btn btn-success btn-lg w-100 mb-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Inscription en cours...
              </>
            ) : "S'inscrire"}
          </button>
        </form>
        <p className="text-center mt-3">
          Déjà un compte ? {' '}
          <Link to="/login" className="text-decoration-none text-primary fw-bold">
            Se connecter ici
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;