import express from 'express';
import { addTache, updateTache, deleteTache, getTaches } from '../controller/tacheController.js';
import { authenticateJWT } from '../middlewares/auth.js';

const router = express.Router();


// Seules les routes POST et PUT sont protégées par JWT
router.post('/', authenticateJWT, addTache);
router.put('/:id', authenticateJWT, updateTache);

// Suppression et affichage accessibles sans authentification
router.delete('/:id', deleteTache);
router.get('/', getTaches);

export default router;
