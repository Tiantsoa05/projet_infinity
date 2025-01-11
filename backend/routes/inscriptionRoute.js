const express = require('express');
const router = express.Router();
const InscriptionController = require('../controllers/inscriptionControler');
const authMiddleware = require('../middleware/auth.middleware');
const { Inscription, Cours } = require('../models/model');

// Route pour créer une nouvelle inscription
router.post('/', authMiddleware, InscriptionController.create);

// Route pour obtenir les inscriptions d'un utilisateur
router.get('/utilisateur/:id', authMiddleware, async (req, res) => {
  try {
    // Vérification que l'utilisateur demande ses propres inscriptions
    if (req.userId !== parseInt(req.params.id)) {
      return res.status(403).json({ 
        message: "Accès non autorisé" 
      });
    }

    const inscriptions = await Inscription.findAll({
      where: { 
        id_utilisateur: req.params.id 
      },
      include: [{
        model: Cours,
        attributes: ['id_cours', 'nom', 'description', 'prix', 'duree', 'niveau_difficulte', 'langue']
      }]
    });

    // Transformer les données pour le client
    const formattedInscriptions = inscriptions.map(inscription => ({
      id_inscription: inscription.id_inscription,
      id_cours: inscription.id_cours,
      date_inscription: inscription.date_inscription,
      progression: inscription.progression,
      cours: inscription.Cours // Les données du cours associé
    }));

    return res.json(formattedInscriptions);
  } catch (error) {
    console.error('Erreur serveur:', error);
    return res.status(500).json({ 
      message: "Erreur lors de la récupération des inscriptions",
      error: error.message 
    });
  }
});

// Autres routes existantes avec middleware d'auth
router.get('/', authMiddleware, InscriptionController.findAll);
router.get('/:id', authMiddleware, InscriptionController.findOne);
router.put('/:id', authMiddleware, InscriptionController.update);
router.delete('/:id', authMiddleware, InscriptionController.delete);

module.exports = router;