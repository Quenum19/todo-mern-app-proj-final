import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Row, Col, InputGroup, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faFilter, faSort } from '@fortawesome/free-solid-svg-icons';
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

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  user: string;
}

const Dashboard: React.FC = () => {
  // Tous les états et logiques sont conservés tels quels
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [tasksError, setTasksError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  // La fonction fetchTasks reste exactement la même
  const fetchTasks = useCallback(async () => {
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
      if (filterStatus !== 'all') params.append('status', filterStatus);
      if (searchQuery) params.append('search', searchQuery);
      if (sortBy) params.append('sortBy', sortBy);
      if (sortOrder) params.append('sortOrder', sortOrder);

      const response = await axios.get(`${API_URL}/tasks?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        setTasksError(err.response?.data?.message || 'Erreur lors du chargement des tâches.');
      }
    } finally {
      setLoadingTasks(false);
    }
  }, [API_URL, navigate, filterStatus, searchQuery, sortBy, sortOrder]);

  // Le useEffect reste identique
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
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
  return (
    <Container fluid="lg" className="py-4">
      {/* En-tête avec nouveau style mais même contenu */}
      <div style={styles.dashboardHeader}>
        <h1 className="mb-1">Tableau de bord</h1>
        <p className="mb-0 opacity-75">Bienvenue, {currentUserEmail}</p>
      </div>

      {/* Le composant TaskForm reste inchangé */}
      <TaskForm onTaskAdded={fetchTasks} />

      {/* Section filtres avec nouveau style mais même fonctionnalité */}
      <div style={styles.filterCard}>
        <h4 style={styles.sectionTitle}>
          <FontAwesomeIcon icon={faFilter} className="me-2" />
          Filtrer et Trier les tâches
        </h4>
        
        <Form>
          <Row className="mb-3 g-3 align-items-end">
            {/* Filtre par statut - même logique */}
            <Col md={6} lg={3}>
              <Form.Group controlId="filterStatus">
                <Form.Label>Filtrer par statut</Form.Label>
                <Form.Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'completed')}
                >
                  <option value="all">Toutes</option>
                  <option value="pending">En attente</option>
                  <option value="completed">Accomplies</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            {/* Tri par critère - même logique */}
            <Col md={6} lg={3}>
              <Form.Group controlId="sortBy">
                <Form.Label>Trier par</Form.Label>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="createdAt">Date de création</option>
                  <option value="dueDate">Date d'échéance</option>
                  <option value="title">Titre</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            {/* Ordre de tri - même logique */}
            <Col md={6} lg={2}>
              <Form.Group controlId="sortOrder">
                <Form.Label>Ordre</Form.Label>
                <Form.Select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="desc">Décroissant</option>
                  <option value="asc">Croissant</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            {/* Barre de recherche - même logique */}
            <Col md={12} lg={4}>
              <Form.Group controlId="searchQuery">
                <Form.Label>Rechercher</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Titre ou description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearchButtonClick()}
                  />
                  {searchQuery && (
                    <Button variant="outline-secondary" onClick={handleClearSearch}>
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  )}
                  <Button variant="primary" onClick={handleSearchButtonClick}>
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>

      {/* Affichage des tâches - même logique */}
      {loadingTasks ? (
        <div className="d-flex justify-content-center my-5 py-5">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : tasksError ? (
        <div className="alert alert-danger mt-4" role="alert">
          <i className="fas fa-exclamation-circle me-2"></i>
          {tasksError}
        </div>
      ) : (
        <TaskList tasks={tasks} onTaskUpdated={fetchTasks} onTaskDeleted={fetchTasks} />
      )}
    </Container>
  );
};

export default Dashboard;