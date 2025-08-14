import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Utilisateur } from '../models/schemas.js';

// Inscription d'un utilisateur
export async function register(req, res) {
  try {
    const { nom, email, motDePasse, role } = req.body;
    const existingUser = await Utilisateur.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé.' });
    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    const user = new Utilisateur({ nom, email, motDePasse: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Connexion utilisateur
export async function login(req, res) {
  try {
    const { email, motDePasse } = req.body;
    const user = await Utilisateur.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé.' });
    const valid = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!valid) return res.status(400).json({ message: 'Mot de passe incorrect.' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, nom: user.nom, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
