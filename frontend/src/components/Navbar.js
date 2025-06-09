import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faSignOutAlt, faTasks } from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    const isAuthenticated = !!user;
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };
    return (_jsx("nav", { className: "navbar navbar-expand-lg navbar-dark bg-primary shadow-sm", children: _jsxs("div", { className: "container-fluid", children: [_jsxs(Link, { className: "navbar-brand d-flex align-items-center", to: isAuthenticated ? "/dashboard" : "/login", children: [_jsx(FontAwesomeIcon, { icon: faTasks, className: "me-2" }), "Ma Super To-Do App"] }), _jsx("button", { className: "navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarNav", "aria-controls": "navbarNav", "aria-expanded": "false", "aria-label": "Toggle navigation", children: _jsx("span", { className: "navbar-toggler-icon" }) }), _jsx("div", { className: "collapse navbar-collapse", id: "navbarNav", children: _jsx("ul", { className: "navbar-nav ms-auto", children: isAuthenticated ? (_jsx("li", { className: "nav-item", children: _jsxs("button", { className: "btn btn-outline-light", onClick: handleLogout, children: [_jsx(FontAwesomeIcon, { icon: faSignOutAlt, className: "me-2" }), "D\u00E9connexion"] }) })) : (_jsxs(_Fragment, { children: [_jsx("li", { className: "nav-item", children: _jsxs(Link, { className: "btn btn-outline-light me-2", to: "/login", children: [_jsx(FontAwesomeIcon, { icon: faSignInAlt, className: "me-2" }), "Connexion"] }) }), _jsx("li", { className: "nav-item", children: _jsxs(Link, { className: "btn btn-light", to: "/register", children: [_jsx(FontAwesomeIcon, { icon: faUserPlus, className: "me-2" }), "S'inscrire"] }) })] })) }) })] }) }));
};
export default Navbar;
