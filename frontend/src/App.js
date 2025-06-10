// frontend/src/App.tsx

/** @jsxImportSource react */
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
const PrivateRoute = ({ children }) => {
    // Dépend directement du localStorage pour la vérification immédiate
    const user = localStorage.getItem('user');
    const isAuthenticated = !!user;
    if (!isAuthenticated) {
        // Redirige immédiatement si non authentifié
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    // Si authentifié, rend les enfants
    return children;
};
function App() {
    return (_jsx(Router, { children: _jsx("div", { className: "App d-flex flex-column min-vh-100", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/login", replace: true }) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/dashboard", element: _jsxs(_Fragment, { children: [_jsx(Navbar, {}), " ", _jsx("main", { className: "flex-grow-1", children: _jsx(PrivateRoute, { children: _jsx(Dashboard, {}) }) })] }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/login", replace: true }) })] }) }) }));
}
export default App;
