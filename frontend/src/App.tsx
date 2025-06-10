// frontend/src/App.tsx
/** @jsxImportSource react */
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  // Dépend directement du localStorage pour la vérification immédiate
  const user = localStorage.getItem('user');
  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    // Redirige immédiatement si non authentifié
    return <Navigate to="/login" replace />;
  }

  // Si authentifié, rend les enfants
  return children;
};

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Routes>
          {/* Routes pour l'authentification (sans Navbar) */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Routes protégées (avec Navbar) */}
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar /> {/* La Navbar s'affiche ici */}
                <main className="flex-grow-1">
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                </main>
              </>
            }
          />
          {/* Optionnel: Gérer les routes inconnues */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;