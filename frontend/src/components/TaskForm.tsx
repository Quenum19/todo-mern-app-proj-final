// frontend/src/components/TaskForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface TaskFormProps {
  onTaskAdded: () => void; // Fonction à appeler après l'ajout d'une tâche
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
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
      await axios.post(
        `${API_URL}/tasks`,
        { title, description, dueDate: dueDate || undefined }, // Envoyer dueDate seulement si non vide
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle('');
      setDescription('');
      setDueDate('');
      onTaskAdded(); // Informe le parent qu'une tâche a été ajoutée
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de l\'ajout de la tâche.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h4 className="mb-3 text-primary">Ajouter une nouvelle tâche</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Titre <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
            placeholder="Ex: Acheter des courses"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description (optionnel)</label>
          <textarea
            className="form-control"
            id="description"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            placeholder="Ex: Lait, œufs, pain..."
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="form-label">Date d'échéance (optionnel)</label>
          <input
            type="date" // Type date pour un sélecteur de date natif
            className="form-control"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Ajout en cours...
            </>
          ) : "Ajouter la tâche"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;