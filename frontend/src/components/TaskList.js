var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// frontend/src/components/TaskList.tsx
import { useState } from 'react'; // Importer useState
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTrash, faEdit, faTimesCircle, faTasks } from '@fortawesome/free-solid-svg-icons';
import EditTaskModal from './EditTaskModal'; // Importe la modale d'édition
const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
    const getToken = () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return user.token;
    };
    const handleOpenEditModal = (task) => {
        setSelectedTask(task);
        setShowEditModal(true);
    };
    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedTask(null);
    };
    const handleToggleStatus = (taskId, currentStatus) => __awaiter(void 0, void 0, void 0, function* () {
        const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
        const token = getToken();
        if (!token)
            return;
        try {
            yield axios.put(`${API_URL}/tasks/${taskId}`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onTaskUpdated();
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour du statut de la tâche:', error);
            alert('Impossible de mettre à jour le statut de la tâche. Vérifiez la console.');
        }
    });
    const handleDeleteTask = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
            return;
        }
        const token = getToken();
        if (!token)
            return;
        try {
            yield axios.delete(`${API_URL}/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onTaskDeleted();
        }
        catch (error) {
            console.error('Erreur lors de la suppression de la tâche:', error);
            alert('Impossible de supprimer la tâche. Vérifiez la console.');
        }
    });
    if (tasks.length === 0) {
        return (_jsxs("div", { className: "alert alert-info text-center mt-4", role: "alert", children: [_jsx(FontAwesomeIcon, { icon: faTasks, className: "me-2" }), "Aucune t\u00E2che trouv\u00E9e. Ajoutez-en une nouvelle !"] }));
    }
    return (_jsxs("div", { className: "mt-4 row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4", children: [tasks.map((task) => (_jsx("div", { className: "col", children: _jsx("div", { className: `card h-100 shadow-sm ${task.status === 'completed' ? 'border-success bg-light' : 'border-primary'}`, children: _jsxs("div", { className: "card-body d-flex flex-column", children: [_jsx("h5", { className: `card-title ${task.status === 'completed' ? 'text-decoration-line-through text-muted' : 'text-primary'}`, children: task.title }), task.description && _jsx("p", { className: "card-text text-muted small flex-grow-1", children: task.description }), task.dueDate && (_jsx("p", { className: "card-text text-info mb-2", children: _jsxs("small", { children: ["\u00C9ch\u00E9ance: ", new Date(task.dueDate).toLocaleDateString()] }) })), _jsxs("div", { className: "d-flex justify-content-between align-items-center mt-auto pt-2 border-top", children: [_jsx("span", { className: `badge ${task.status === 'completed' ? 'bg-success' : 'bg-warning text-dark'}`, children: task.status === 'completed' ? 'Accomplie' : 'En attente' }), _jsxs("div", { children: [_jsx("button", { className: `btn btn-sm me-2 ${task.status === 'completed' ? 'btn-outline-warning' : 'btn-outline-success'}`, onClick: () => handleToggleStatus(task._id, task.status), title: task.status === 'completed' ? 'Rouvrir la tâche' : 'Marquer comme terminée', children: _jsx(FontAwesomeIcon, { icon: task.status === 'completed' ? faTimesCircle : faCheckCircle }) }), _jsx("button", { className: "btn btn-outline-info btn-sm me-2" // Nouveau bouton modifier
                                                , onClick: () => handleOpenEditModal(task), title: "Modifier la t\u00E2che", children: _jsx(FontAwesomeIcon, { icon: faEdit }) }), _jsx("button", { className: "btn btn-outline-danger btn-sm", onClick: () => handleDeleteTask(task._id), title: "Supprimer la t\u00E2che", children: _jsx(FontAwesomeIcon, { icon: faTrash }) })] })] })] }) }) }, task._id))), _jsx(EditTaskModal, { show: showEditModal, handleClose: handleCloseEditModal, task: selectedTask, onTaskUpdated: onTaskUpdated })] }));
};
export default TaskList;
