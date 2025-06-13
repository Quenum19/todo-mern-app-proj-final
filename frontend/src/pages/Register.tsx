import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faEnvelope, faLock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Register: React.FC = () => {
  // États inchangés
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  // handleSubmit identique
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
      const response = await axios.post(`${API_URL}/api/users/register`, { email, password });
      setSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription.');
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
            {/* Carte d'inscription */}
            <div className="card border-0 shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <div className="card-header bg-success text-white py-4">
                <div className="text-center">
                  <h2 className="mb-1">
                    <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                    Inscription
                  </h2>
                  <p className="mb-0 opacity-75">Créez votre compte en quelques secondes</p>
                </div>
              </div>
              
              <div className="card-body p-5">
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show">
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                  </div>
                )}

                {success && (
                  <div className="alert alert-success alert-dismissible fade show">
                    <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                    {success}
                    <button type="button" className="btn-close" onClick={() => setSuccess(null)}></button>
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
                    <div className="form-text">Minimum 8 caractères</div>
                  </div>

                  {/* Champ Confirmation mot de passe */}
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label fw-medium">Confirmer le mot de passe</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FontAwesomeIcon icon={faLock} className="text-muted" />
                      </span>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-control form-control-lg"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={loading}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {/* Bouton d'inscription */}
                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      className="btn btn-success btn-lg py-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Inscription...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                          S'inscrire
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <p className="mb-0">Déjà un compte ?{' '}
                      <Link to="/login" className="text-decoration-none fw-medium text-success">
                        Connectez-vous ici
                      </Link>
                    </p>
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

export default Register;