// frontend/src/pages/Dashboard.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

// Reste la même interface Task que précédemment
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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [tasksError, setTasksError] = useState<string | null>(null);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

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
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response && err.response.status === 401) {
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        setTasksError(err.response?.data?.message || 'Erreur lors du chargement des tâches.');
      }
    } finally {
      setLoadingTasks(false);
    }
  }, [API_URL, navigate]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [navigate, fetchTasks]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = localStorage.getItem('user');
  const currentUserEmail = user ? JSON.parse(user).email : 'Invité';

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Bienvenue, {currentUserEmail} !</h1>
        <button onClick={handleLogout} className="btn btn-danger">Déconnexion</button>
      </div>

      <TaskForm onTaskAdded={fetchTasks} />

      {loadingTasks ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement des tâches...</span>
          </div>
        </div>
      ) : tasksError ? (
        <div className="alert alert-danger mt-4" role="alert">{tasksError}</div>
      ) : (
        // Passe les fonctions de rappel à TaskList
        <TaskList tasks={tasks} onTaskUpdated={fetchTasks} onTaskDeleted={fetchTasks} />
      )}
    </div>
  );
};

export default Dashboard;