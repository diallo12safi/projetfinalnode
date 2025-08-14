import mongoose from 'mongoose';

const utilisateurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  role: { type: String, enum: ['admin', 'membre'], default: 'membre' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const tacheSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String },
  priorite: { type: String, enum: ['basse', 'moyenne', 'haute'], default: 'moyenne' },
  statut: { type: String, enum: ['en_cours', 'terminee'], default: 'en_cours' },
  creePar: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' }],
  dateDebut: { type: Date },
  dateEcheance: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema,'users');
export const Tache = mongoose.model('Tache', tacheSchema,'taches');
