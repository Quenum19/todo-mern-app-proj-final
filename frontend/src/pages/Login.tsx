// frontend/src/pages/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Nous allons installer axios

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_REACT_APP_API_URL; // Récupère l'URL de l'API

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/users/login`, { email, password });
      localStorage.setItem('user', JSON.stringify(response.data)); // Stocke les infos utilisateur (dont le token)
      navigate('/dashboard'); // Redirige vers le tableau de bord
    } catch (err: any) {
      setError(err.response?.data?.message || 'Identifiants invalides.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center py-5">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '450px', borderRadius: '10px' }}>
        <div className="text-center mb-4">
          <h1 className="display-5 text-primary fw-bold">Ma Super To-Do App</h1>
          <p className="text-muted">Gérez vos tâches simplement et efficacement.</p>
        </div>
        <h2 className="card-title text-center mb-4 h4">Connexion</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
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
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Mot de passe:</label>
            <input
              type="password"
              id="password"
              className="form-control form-control-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 mb-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Connexion en cours...
              </>
            ) : "Se connecter"}
          </button>
        </form>
        <p className="text-center mt-3">
          Pas encore de compte ? {' '}
          <Link to="/register" className="text-decoration-none text-primary fw-bold">
            S'inscrire ici
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;