import { Utilisateur } from '../models/schemas.js';
import bcrypt from 'bcryptjs';

// Liste des membres (hors admin)
export async function getMembres(req, res) {
  try {
    const membres = await Utilisateur.find({ role: 'membre' }).select('-motDePasse');
    res.json(membres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Ajouter un membre
export async function addMembre(req, res) {
  try {
    const { nom, email, motDePasse } = req.body;
    const existingUser = await Utilisateur.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé.' });
    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    const membre = new Utilisateur({ nom, email, motDePasse: hashedPassword, role: 'membre' });
    await membre.save();
    res.status(201).json({ message: 'Membre ajouté.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Modifier un membre
export async function updateMembre(req, res) {
  try {
    const { id } = req.params;
    const { nom, email, motDePasse } = req.body;
    const update = { nom, email };
    if (motDePasse) update.motDePasse = await bcrypt.hash(motDePasse, 10);
    const membre = await Utilisateur.findByIdAndUpdate(id, update, { new: true });
    if (!membre) return res.status(404).json({ message: 'Membre non trouvé.' });
    res.json({ message: 'Membre modifié.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Supprimer un membre
export async function deleteMembre(req, res) {
  try {
    const { id } = req.params;
    const membre = await Utilisateur.findByIdAndDelete(id);
    if (!membre) return res.status(404).json({ message: 'Membre non trouvé.' });
    res.json({ message: 'Membre supprimé.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
