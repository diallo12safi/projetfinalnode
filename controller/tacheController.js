import { Tache } from '../models/schemas.js';

// Ajouter une tâche
export async function addTache(req, res) {
  try {
    const { titre, description, priorite, statut, assignees, dateDebut, dateEcheance } = req.body;
    const creePar = req.user.id;
    const tache = new Tache({ titre, description, priorite, statut, creePar, assignees, dateDebut, dateEcheance });
    await tache.save();
    res.status(201).json({ message: 'Tâche ajoutée.', tache });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Modifier une tâche
export async function updateTache(req, res) {
  try {
    const { id } = req.params;
    const update = req.body;
    const tache = await Tache.findByIdAndUpdate(id, update, { new: true });
    if (!tache) return res.status(404).json({ message: 'Tâche non trouvée.' });
    res.json({ message: 'Tâche modifiée.', tache });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Supprimer une tâche
export async function deleteTache(req, res) {
  try {
    const { id } = req.params;
    const tache = await Tache.findByIdAndDelete(id);
    if (!tache) return res.status(404).json({ message: 'Tâche non trouvée.' });
    res.json({ message: 'Tâche supprimée.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Afficher les tâches avec pagination et filtres
export async function getTaches(req, res) {
  try {
    const { page = 1, limit = 3, priorite, statut } = req.query;
    const filter = {};
    if (priorite) filter.priorite = priorite;
    if (statut) filter.statut = statut;
    const taches = await Tache.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('creePar', 'nom email')
      .populate('assignees', 'nom email');
    const total = await Tache.countDocuments(filter);
    res.json({ taches, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
