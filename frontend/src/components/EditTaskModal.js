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
// frontend/src/components/EditTaskModal.tsx
import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
const EditTaskModal = ({ show, handleClose, task, onTaskUpdated }) => {
    const [title, setTitle] = useState((task === null || task === void 0 ? void 0 : task.title) || '');
    const [description, setDescription] = useState((task === null || task === void 0 ? void 0 : task.description) || '');
    const [dueDate, setDueDate] = useState((task === null || task === void 0 ? void 0 : task.dueDate) ? new Date(task.dueDate).toISOString().split('T')[0] : '');
    const [status, setStatus] = useState((task === null || task === void 0 ? void 0 : task.status) || 'pending');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
    useEffect(() => {
        // Met à jour les états locaux quand la tâche prop change (quand la modale s'ouvre avec une nouvelle tâche)
        if (task) {
            setTitle(task.title);
            setDescription(task.description || '');
            setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
            setStatus(task.status);
            setError(null); // Réinitialise les erreurs à chaque ouverture
        }
    }, [task]); // S'exécute quand 'task' change
    const getToken = () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return user.token;
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        e.preventDefault();
        setError(null);
        setLoading(true);
        if (!task || !task._id) {
            setError("Erreur: Aucune tâche sélectionnée pour la modification.");
            setLoading(false);
            return;
        }
        const token = getToken();
        if (!token) {
            setError('Vous devez être connecté pour modifier une tâche.');
            setLoading(false);
            return;
        }
        try {
            yield axios.put(`${API_URL}/tasks/${task._id}`, { title, description, dueDate: dueDate || undefined, status }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onTaskUpdated(); // Informe le parent qu'une tâche a été mise à jour
            handleClose(); // Ferme la modale
        }
        catch (err) {
            setError(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Erreur lors de la modification de la tâche.');
        }
        finally {
            setLoading(false);
        }
    });
    return (_jsxs(Modal, { show: show, onHide: handleClose, centered: true, children: [_jsx(Modal.Header, { closeButton: true, className: "bg-primary text-white", children: _jsx(Modal.Title, { children: "Modifier la T\u00E2che" }) }), _jsxs(Modal.Body, { children: [error && _jsx("div", { className: "alert alert-danger", children: error }), _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Titre" }), _jsx(Form.Control, { type: "text", value: title, onChange: (e) => setTitle(e.target.value), required: true, disabled: loading })] }), _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Description" }), _jsx(Form.Control, { as: "textarea", rows: 3, value: description, onChange: (e) => setDescription(e.target.value), disabled: loading })] }), _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Date d'\u00E9ch\u00E9ance" }), _jsx(Form.Control, { type: "date", value: dueDate, onChange: (e) => setDueDate(e.target.value), disabled: loading })] }), _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Statut" }), _jsxs(Form.Select, { value: status, onChange: (e) => setStatus(e.target.value), disabled: loading, children: [_jsx("option", { value: "pending", children: "En attente" }), _jsx("option", { value: "completed", children: "Accomplie" })] })] }), _jsxs("div", { className: "d-flex justify-content-end mt-4", children: [_jsx(Button, { variant: "secondary", onClick: handleClose, className: "me-2", children: "Annuler" }), _jsx(Button, { variant: "primary", type: "submit", disabled: loading, children: loading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "spinner-border spinner-border-sm me-2", role: "status", "aria-hidden": "true" }), "Sauvegarde..."] })) : "Sauvegarder les modifications" })] })] })] })] }));
};
export default EditTaskModal;
