import express from 'express';
import { getMembres, addMembre, updateMembre, deleteMembre } from '../controller/membreController.js';
import { authenticateJWT, isAdmin } from '../middlewares/auth.js';

const router = express.Router();


// Route GET accessible sans protection
router.get('/', getMembres); // Liste des membres

// Les autres routes sont protégées par JWT et réservées à l'admin
router.use(authenticateJWT, isAdmin);
router.post('/', addMembre); // Ajouter un membre
router.put('/:id', updateMembre); // Modifier un membre
router.delete('/:id', deleteMembre); // Supprimer un membre

export default router;
