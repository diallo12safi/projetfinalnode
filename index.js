import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import membresRoutes from './routes/membres.js';
import tachesRoutes from './routes/taches.js';

// Initialisation
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Connexion à la base de données
connectDB();

// Routes d'authentification
app.use('/api/auth', authRoutes);

// Routes membres (admin uniquement)
app.use('/api/membres', membresRoutes);

// Routes tâches (CRUD, pagination, filtres)
app.use('/api/taches', tachesRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
