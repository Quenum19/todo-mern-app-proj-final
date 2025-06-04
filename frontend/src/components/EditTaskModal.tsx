// frontend/src/components/EditTaskModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form }  from 'react-bootstrap';
import axios from 'axios';

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  dueDate?: string;
}

interface EditTaskModalProps {
  show: boolean; // Pour contrôler l'affichage de la modale
  handleClose: () => void; // Fonction appelée à la fermeture de la modale
  task: Task | null; // La tâche à modifier (null si aucune)
  onTaskUpdated: () => void; // Fonction appelée après une mise à jour réussie
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ show, handleClose, task, onTaskUpdated }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
  const [status, setStatus] = useState<'pending' | 'completed'>(task?.status || 'pending');
  const [error, setError] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
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
      await axios.put(
        `${API_URL}/tasks/${task._id}`,
        { title, description, dueDate: dueDate || undefined, status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onTaskUpdated(); // Informe le parent qu'une tâche a été mise à jour
      handleClose(); // Ferme la modale
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la modification de la tâche.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Modifier la Tâche</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Titre</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date d'échéance</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Statut</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'pending' | 'completed')}
              disabled={loading}
            >
              <option value="pending">En attente</option>
              <option value="completed">Accomplie</option>
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Annuler
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sauvegarde...
                </>
              ) : "Sauvegarder les modifications"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTaskModal;