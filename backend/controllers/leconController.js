const { Lecon } = require('../models/model');

const leconController = {
  // Récupérer toutes les leçons d'un cours
  async getAllLecons(req, res) {
    try {
      const { coursId } = req.params;
      const lecons = await Lecon.findAll({
        where: { id_cours: coursId },
        order: [['id_lecon', 'ASC']]
      });
      res.json({ success: true, data: lecons });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Créer une nouvelle leçon
  async createLecon(req, res) {
    try {
      const { coursId } = req.params;
      const lecon = await Lecon.create({
        ...req.body,
        id_cours: coursId
      });
      res.status(201).json({ success: true, data: lecon });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Mettre à jour une leçon
  async updateLecon(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Lecon.update(req.body, {
        where: { id_lecon: id }
      });
      if (updated) {
        const updatedLecon = await Lecon.findByPk(id);
        res.json({ success: true, data: updatedLecon });
      } else {
        res.status(404).json({ success: false, error: 'Leçon non trouvée' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Supprimer une leçon
  async deleteLecon(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Lecon.destroy({
        where: { id_lecon: id }
      });
      if (deleted) {
        res.json({ success: true, message: 'Leçon supprimée avec succès' });
      } else {
        res.status(404).json({ success: false, error: 'Leçon non trouvée' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = leconController;