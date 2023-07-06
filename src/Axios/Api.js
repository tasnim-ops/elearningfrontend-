import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: true
});

// Ajoutez cette ligne pour intercepter les requêtes sortantes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Récupérer le token d'autorisation à partir du stockage local (vous pouvez ajuster cela en fonction de votre implémentation)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Ajouter le token d'autorisation à l'en-tête de la requête
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
