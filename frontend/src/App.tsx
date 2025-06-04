// frontend/src/App.tsx
import 'bootstrap/dist/css/bootstrap.min.css'; // Importe le CSS de Bootstrap
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Sera utilisé plus tard

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container mt-5">
          <h1 className="text-center text-primary mb-4">Bienvenue sur Ma Super To-Do App (Frontend)</h1>
          <p className="text-center text-muted">Ce frontend React est prêt !</p>

          {/* Ici, nous allons définir nos routes plus tard */}
          <Routes>
            <Route path="/" element={<h2 className="text-center mt-5">Page d'accueil</h2>} />
            {/* <Route path="/login" element={<LoginPage />} /> */}
            {/* <Route path="/register" element={<RegisterPage />} /> */}
            {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;