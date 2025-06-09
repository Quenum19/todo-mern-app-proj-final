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
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Row, Col, InputGroup, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faFilter } from '@fortawesome/free-solid-svg-icons';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
// Styles CSS-in-JS - Seulement l'aspect visuel est modifié ici
const styles = {
    dashboardHeader: {
        backgroundColor: '#2563eb',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    filterCard: {
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        borderLeft: '4px solid #3b82f6'
    },
    sectionTitle: {
        color: '#1e40af',
        marginBottom: '1.5rem',
        fontWeight: '600',
        borderBottom: '2px solid #e2e8f0',
        paddingBottom: '0.5rem'
    }
};
const Dashboard = () => {
    // Tous les états et logiques sont conservés tels quels
    const [tasks, setTasks] = useState([]);
    const [loadingTasks, setLoadingTasks] = useState(true);
    const [tasksError, setTasksError] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
    // La fonction fetchTasks reste exactement la même
    const fetchTasks = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        setLoadingTasks(true);
        setTasksError(null);
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = user.token;
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const params = new URLSearchParams();
            if (filterStatus !== 'all')
                params.append('status', filterStatus);
            if (searchQuery)
                params.append('search', searchQuery);
            if (sortBy)
                params.append('sortBy', sortBy);
            if (sortOrder)
                params.append('sortOrder', sortOrder);
            const response = yield axios.get(`${API_URL}/tasks?${params.toString()}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(response.data);
        }
        catch (err) {
            if (axios.isAxiosError(err) && ((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                localStorage.removeItem('user');
                navigate('/login');
            }
            else {
                setTasksError(((_c = (_b = err.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || 'Erreur lors du chargement des tâches.');
            }
        }
        finally {
            setLoadingTasks(false);
        }
    }), [API_URL, navigate, filterStatus, searchQuery, sortBy, sortOrder]);
    // Le useEffect reste identique
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
        }
        else {
            fetchTasks();
        }
    }, [navigate, fetchTasks]);
    const currentUserEmail = JSON.parse(localStorage.getItem('user') || '{}').email || 'Invité';
    const handleSearchButtonClick = () => {
        fetchTasks();
    };
    const handleClearSearch = () => {
        setSearchQuery('');
        fetchTasks();
    };
    // Seul le JSX est modifié pour le design, la structure logique reste la même
    return (_jsxs(Container, { fluid: "lg", className: "py-4", children: [_jsxs("div", { style: styles.dashboardHeader, children: [_jsx("h1", { className: "mb-1", children: "Tableau de bord" }), _jsxs("p", { className: "mb-0 opacity-75", children: ["Bienvenue, ", currentUserEmail] })] }), _jsx(TaskForm, { onTaskAdded: fetchTasks }), _jsxs("div", { style: styles.filterCard, children: [_jsxs("h4", { style: styles.sectionTitle, children: [_jsx(FontAwesomeIcon, { icon: faFilter, className: "me-2" }), "Filtrer et Trier les t\u00E2ches"] }), _jsx(Form, { children: _jsxs(Row, { className: "mb-3 g-3 align-items-end", children: [_jsx(Col, { md: 6, lg: 3, children: _jsxs(Form.Group, { controlId: "filterStatus", children: [_jsx(Form.Label, { children: "Filtrer par statut" }), _jsxs(Form.Select, { value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), children: [_jsx("option", { value: "all", children: "Toutes" }), _jsx("option", { value: "pending", children: "En attente" }), _jsx("option", { value: "completed", children: "Accomplies" })] })] }) }), _jsx(Col, { md: 6, lg: 3, children: _jsxs(Form.Group, { controlId: "sortBy", children: [_jsx(Form.Label, { children: "Trier par" }), _jsxs(Form.Select, { value: sortBy, onChange: (e) => setSortBy(e.target.value), children: [_jsx("option", { value: "createdAt", children: "Date de cr\u00E9ation" }), _jsx("option", { value: "dueDate", children: "Date d'\u00E9ch\u00E9ance" }), _jsx("option", { value: "title", children: "Titre" })] })] }) }), _jsx(Col, { md: 6, lg: 2, children: _jsxs(Form.Group, { controlId: "sortOrder", children: [_jsx(Form.Label, { children: "Ordre" }), _jsxs(Form.Select, { value: sortOrder, onChange: (e) => setSortOrder(e.target.value), children: [_jsx("option", { value: "desc", children: "D\u00E9croissant" }), _jsx("option", { value: "asc", children: "Croissant" })] })] }) }), _jsx(Col, { md: 12, lg: 4, children: _jsxs(Form.Group, { controlId: "searchQuery", children: [_jsx(Form.Label, { children: "Rechercher" }), _jsxs(InputGroup, { children: [_jsx(Form.Control, { type: "text", placeholder: "Titre ou description...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), onKeyPress: (e) => e.key === 'Enter' && handleSearchButtonClick() }), searchQuery && (_jsx(Button, { variant: "outline-secondary", onClick: handleClearSearch, children: _jsx(FontAwesomeIcon, { icon: faTimes }) })), _jsx(Button, { variant: "primary", onClick: handleSearchButtonClick, children: _jsx(FontAwesomeIcon, { icon: faSearch }) })] })] }) })] }) })] }), loadingTasks ? (_jsx("div", { className: "d-flex justify-content-center my-5 py-5", children: _jsx("div", { className: "spinner-border text-primary", style: { width: '3rem', height: '3rem' }, role: "status", children: _jsx("span", { className: "visually-hidden", children: "Chargement..." }) }) })) : tasksError ? (_jsxs("div", { className: "alert alert-danger mt-4", role: "alert", children: [_jsx("i", { className: "fas fa-exclamation-circle me-2" }), tasksError] })) : (_jsx(TaskList, { tasks: tasks, onTaskUpdated: fetchTasks, onTaskDeleted: fetchTasks }))] }));
};
export default Dashboard;
