// frontend/src/components/TaskList.tsx
import React from 'react';

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  dueDate?: string; // Sera une chaîne ISO date du backend
  createdAt: string;
  updatedAt: string;
}

interface TaskListProps {
  tasks: Task[]; // Liste des tâches à afficher
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div className="alert alert-info text-center mt-4" role="alert">
        Aucune tâche trouvée. Ajoutez-en une nouvelle !
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h4 className="mb-3 text-primary">Mes Tâches</h4>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              task.status === 'completed' ? 'list-group-item-success' : ''
            }`}
          >
            <div>
              <h5 className={task.status === 'completed' ? 'text-decoration-line-through' : ''}>
                {task.title}
              </h5>
              {task.description && <p className="mb-1 text-muted">{task.description}</p>}
              {task.dueDate && (
                <small className="text-info">
                  Échéance: {new Date(task.dueDate).toLocaleDateString()}
                </small>
              )}
            </div>
            {/* Boutons d'action (mise à jour/suppression) viendront ici dans la phase 4 */}
            <div className="d-flex align-items-center">
                <span className={`badge ${task.status === 'completed' ? 'bg-success' : 'bg-warning text-dark'} ms-2`}>
                    {task.status === 'completed' ? 'Accomplie' : 'En attente'}
                </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;