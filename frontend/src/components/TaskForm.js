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
// frontend/src/components/TaskForm.tsx
import { useState } from 'react';
import axios from 'axios';
const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        e.preventDefault();
        setError(null);
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = user.token;
        if (!token) {
            setError('Vous devez être connecté pour ajouter une tâche.');
            setLoading(false);
            return;
        }
        try {
            yield axios.post(`${API_URL}/tasks`, { title, description, dueDate: dueDate || undefined }, // Envoyer dueDate seulement si non vide
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTitle('');
            setDescription('');
            setDueDate('');
            onTaskAdded(); // Informe le parent qu'une tâche a été ajoutée
        }
        catch (err) {
            setError(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Erreur lors de l\'ajout de la tâche.');
        }
        finally {
            setLoading(false);
        }
    });
    return (_jsxs("div", { className: "card p-3 mb-4 shadow-sm", children: [_jsx("h4", { className: "mb-3 text-primary", children: "Ajouter une nouvelle t\u00E2che" }), error && _jsx("div", { className: "alert alert-danger", children: error }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-3", children: [_jsxs("label", { htmlFor: "title", className: "form-label", children: ["Titre ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx("input", { type: "text", className: "form-control", id: "title", value: title, onChange: (e) => setTitle(e.target.value), required: true, disabled: loading, placeholder: "Ex: Acheter des courses" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "description", className: "form-label", children: "Description (optionnel)" }), _jsx("textarea", { className: "form-control", id: "description", rows: 2, value: description, onChange: (e) => setDescription(e.target.value), disabled: loading, placeholder: "Ex: Lait, \u0153ufs, pain..." })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "dueDate", className: "form-label", children: "Date d'\u00E9ch\u00E9ance (optionnel)" }), _jsx("input", { type: "date" // Type date pour un sélecteur de date natif
                                , className: "form-control", id: "dueDate", value: dueDate, onChange: (e) => setDueDate(e.target.value), disabled: loading })] }), _jsx("button", { type: "submit", className: "btn btn-success w-100", disabled: loading, children: loading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "spinner-border spinner-border-sm me-2", role: "status", "aria-hidden": "true" }), "Ajout en cours..."] })) : "Ajouter la tâche" })] })] }));
};
export default TaskForm;
