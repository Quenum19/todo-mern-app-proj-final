var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faEnvelope, faLock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const Register = () => {
    // États inchangés
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
    // handleSubmit identique
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
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
            const response = yield axios.post(`${API_URL}/users/register`, { email, password });
            setSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
        catch (err) {
            setError(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Erreur lors de l\'inscription.');
        }
        finally {
            setLoading(false);
        }
    });
    return (_jsx("div", { className: "auth-page", style: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }, children: _jsx("div", { className: "container py-5", children: _jsx("div", { className: "row justify-content-center", children: _jsx("div", { className: "col-md-8 col-lg-6", children: _jsxs("div", { className: "card border-0 shadow-lg", style: { borderRadius: '15px', overflow: 'hidden' }, children: [_jsx("div", { className: "card-header bg-success text-white py-4", children: _jsxs("div", { className: "text-center", children: [_jsxs("h2", { className: "mb-1", children: [_jsx(FontAwesomeIcon, { icon: faUserPlus, className: "me-2" }), "Inscription"] }), _jsx("p", { className: "mb-0 opacity-75", children: "Cr\u00E9ez votre compte en quelques secondes" })] }) }), _jsxs("div", { className: "card-body p-5", children: [error && (_jsxs("div", { className: "alert alert-danger alert-dismissible fade show", children: [error, _jsx("button", { type: "button", className: "btn-close", onClick: () => setError(null) })] })), success && (_jsxs("div", { className: "alert alert-success alert-dismissible fade show", children: [_jsx(FontAwesomeIcon, { icon: faCheckCircle, className: "me-2" }), success, _jsx("button", { type: "button", className: "btn-close", onClick: () => setSuccess(null) })] })), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "email", className: "form-label fw-medium", children: "Adresse Email" }), _jsxs("div", { className: "input-group", children: [_jsx("span", { className: "input-group-text bg-light", children: _jsx(FontAwesomeIcon, { icon: faEnvelope, className: "text-muted" }) }), _jsx("input", { type: "email", id: "email", className: "form-control form-control-lg", value: email, onChange: (e) => setEmail(e.target.value), required: true, disabled: loading, placeholder: "votre@email.com" })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "password", className: "form-label fw-medium", children: "Mot de passe" }), _jsxs("div", { className: "input-group", children: [_jsx("span", { className: "input-group-text bg-light", children: _jsx(FontAwesomeIcon, { icon: faLock, className: "text-muted" }) }), _jsx("input", { type: "password", id: "password", className: "form-control form-control-lg", value: password, onChange: (e) => setPassword(e.target.value), required: true, disabled: loading, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] }), _jsx("div", { className: "form-text", children: "Minimum 8 caract\u00E8res" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "confirmPassword", className: "form-label fw-medium", children: "Confirmer le mot de passe" }), _jsxs("div", { className: "input-group", children: [_jsx("span", { className: "input-group-text bg-light", children: _jsx(FontAwesomeIcon, { icon: faLock, className: "text-muted" }) }), _jsx("input", { type: "password", id: "confirmPassword", className: "form-control form-control-lg", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, disabled: loading, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] })] }), _jsx("div", { className: "d-grid mb-3", children: _jsx("button", { type: "submit", className: "btn btn-success btn-lg py-3", disabled: loading, children: loading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "spinner-border spinner-border-sm me-2", role: "status" }), "Inscription..."] })) : (_jsxs(_Fragment, { children: [_jsx(FontAwesomeIcon, { icon: faUserPlus, className: "me-2" }), "S'inscrire"] })) }) }), _jsx("div", { className: "text-center mt-4", children: _jsxs("p", { className: "mb-0", children: ["D\u00E9j\u00E0 un compte ?", ' ', _jsx(Link, { to: "/login", className: "text-decoration-none fw-medium text-success", children: "Connectez-vous ici" })] }) })] })] })] }) }) }) }) }));
};
export default Register;
