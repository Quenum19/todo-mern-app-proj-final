// frontend/src/components/TaskList.tsx
import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTrash, faEdit, faTimesCircle, faTasks  } from '@fortawesome/free-solid-svg-icons'; // Nouvelles icônes

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

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.token;
  };

  const handleToggleStatus = async (taskId: string, currentStatus: 'pending' | 'completed') => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    const token = getToken();
    if (!token) return;

    try {
      await axios.put(`${API_URL}/tasks/${taskId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onTaskUpdated();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la tâche:', error);
      alert('Impossible de mettre à jour le statut de la tâche.'); // Conserver l'alerte pour le débogage si besoin
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      return;
    }

    const token = getToken();
    if (!token) return;

    try {
        await axios.delete(`${API_URL}/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

      onTaskDeleted();
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
      alert('Impossible de supprimer la tâche.'); // Conserver l'alerte pour le débogage si besoin
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="alert alert-info text-center mt-4" role="alert">
        <FontAwesomeIcon icon={faTasks} className="me-2" />
        Aucune tâche trouvée. Ajoutez-en une nouvelle !
      </div>
    );
  }

  return (
    <div className="mt-4 row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"> {/* Utilise des colonnes pour un affichage en grille */}
      {tasks.map((task) => (
        <div className="col" key={task._id}>
          <div className={`card h-100 shadow-sm ${task.status === 'completed' ? 'border-success bg-light' : 'border-primary'}`}>
            <div className="card-body d-flex flex-column">
              <h5 className={`card-title ${task.status === 'completed' ? 'text-decoration-line-through text-muted' : 'text-primary'}`}>
                {task.title}
              </h5>
              {task.description && <p className="card-text text-muted small flex-grow-1">{task.description}</p>}
              {task.dueDate && (
                <p className="card-text text-info mb-2">
                  <small>Échéance: {new Date(task.dueDate).toLocaleDateString()}</small>
                </p>
              )}
              <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top"> {/* Actions en bas de carte */}
                <span className={`badge ${task.status === 'completed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {task.status === 'completed' ? 'Accomplie' : 'En attente'}
                </span>
                <div>
                    <button
                        className={`btn btn-sm me-2 ${
                            task.status === 'completed' ? 'btn-outline-warning' : 'btn-outline-success'
                        }`}
                        onClick={() => handleToggleStatus(task._id, task.status)}
                        title={task.status === 'completed' ? 'Rouvrir la tâche' : 'Marquer comme terminée'}
                    >
                        <FontAwesomeIcon icon={task.status === 'completed' ? faTimesCircle : faCheckCircle} />
                    </button>
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteTask(task._id)}
                        title="Supprimer la tâche"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;