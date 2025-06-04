import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const Login: React.FC = () => {
  // États inchangés
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  // handleSubmit identique
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/users/login`, { email, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Identifiants invalides.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            {/* Carte de connexion */}
            <div className="card border-0 shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <div className="card-header bg-primary text-white py-4">
                <div className="text-center">
                  <h2 className="mb-1">
                    <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                    Connexion
                  </h2>
                  <p className="mb-0 opacity-75">Accédez à votre espace personnel</p>
                </div>
              </div>
              
              <div className="card-body p-5">
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show">
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Champ Email */}
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-medium">Adresse Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FontAwesomeIcon icon={faEnvelope} className="text-muted" />
                      </span>
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  {/* Champ Mot de passe */}
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-medium">Mot de passe</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FontAwesomeIcon icon={faLock} className="text-muted" />
                      </span>
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {/* Bouton de connexion */}
                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg py-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Connexion...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                          Se connecter
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <Link to="/register" className="text-decoration-none text-primary fw-medium">
                      Pas encore de compte ? Créez-en un ici
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;