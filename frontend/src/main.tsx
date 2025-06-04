// frontend/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from  './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Assure-toi que Bootstrap est toujours là

// Font Awesome Configuration
import { library } from '@fortawesome/fontawesome-svg-core';
// ...
import { faCheckCircle, faTrash, faEdit, faPlusCircle, faTimesCircle, faSignInAlt, faUserPlus, faSignOutAlt, faTasks, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'; // Ajout de faSearch et faTimes

library.add(faCheckCircle, faTrash, faEdit, faPlusCircle, faTimesCircle, faSignInAlt, faUserPlus, faSignOutAlt, faTasks, faSearch, faTimes);
// ...
// ^ Ajoute les icônes que tu prévois d'utiliser

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);