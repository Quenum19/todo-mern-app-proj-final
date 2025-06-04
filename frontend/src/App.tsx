import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Layout privé avec Outlet
const PrivateRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Toutes les routes protégées passent par PrivateRoute */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Tu peux ajouter d'autres routes protégées ici */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
