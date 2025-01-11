const {Inscription, Utilisateur, Cours } = require('../models/model');



const InscriptionController = {
  async create(req, res) {
    try {
      const { id_utilisateur, id_cours } = req.body;
      
      console.log('Données reçues:', { id_utilisateur, id_cours });
      console.log('User ID from token:', req.userId);
      
      // Vérifier que l'utilisateur qui fait la requête est bien celui qui s'inscrit
      if (req.userId !== parseInt(id_utilisateur)) {
        return res.status(403).json({ 
          message: "Vous n'êtes pas autorisé à inscrire un autre utilisateur" 
        });
      }

      // Vérifier si l'inscription existe déjà
      const existingInscription = await Inscription.findOne({
        where: {
          id_utilisateur,
          id_cours
        }
      });

      if (existingInscription) {
        return res.status(400).json({ 
          message: "Vous êtes déjà inscrit à ce cours" 
        });
      }

      // Vérifier que l'utilisateur et le cours existent
      const [utilisateur, cours] = await Promise.all([
        Utilisateur.findByPk(id_utilisateur),
        Cours.findByPk(id_cours)
      ]);

      if (!utilisateur) {
        return res.status(404).json({ 
          message: "Utilisateur non trouvé" 
        });
      }

      if (!cours) {
        return res.status(404).json({ 
          message: "Cours non trouvé" 
        });
      }

      // Créer l'inscription avec la date actuelle
      const inscription = await Inscription.create({
        id_utilisateur,
        id_cours,
        date_inscription: new Date(),
        progression: 0
      });

      // Récupérer l'inscription avec les données du cours
      const inscriptionComplete = await Inscription.findByPk(inscription.id_inscription, {
        include: [{
          model: Cours,
          attributes: ['id_cours', 'nom', 'description', 'prix', 'duree', 'niveau_difficulte', 'langue']
        }]
      });

      return res.status(201).json({
        message: "Inscription réussie",
        data: inscriptionComplete
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'inscription:', error);
      return res.status(500).json({ 
        message: "Erreur lors de la création de l'inscription",
        error: error.message 
      });
    }
  },

  
    // Obtenir toutes les inscriptions
    async findAll(req, res) {
      try {
        const inscriptions = await Inscription.findAll({
          include: [
            { model: Utilisateur },
            { model: Cours }
          ]
        });
        return res.json(inscriptions);
      } catch (error) {
        return res.status(500).json({ 
          message: "Erreur lors de la récupération des inscriptions",
          error: error.message 
        });
      }
    },
  
    // Obtenir une inscription par ID
    async findOne(req, res) {
      try {
        const inscription = await Inscription.findByPk(req.params.id, {
          include: [
            { model: Utilisateur },
            { model: Cours }
          ]
        });
        if (!inscription) {
          return res.status(404).json({ 
            message: "Inscription non trouvée" 
          });
        }
        return res.json(inscription);
      } catch (error) {
        return res.status(500).json({ 
          message: "Erreur lors de la récupération de l'inscription",
          error: error.message 
        });
      }
    },
  
    // Mettre à jour une inscription
    async update(req, res) {
      try {
        const inscription = await Inscription.findByPk(req.params.id);
        if (!inscription) {
          return res.status(404).json({ 
            message: "Inscription non trouvée" 
          });
        }
        await inscription.update(req.body);
        return res.json(inscription);
      } catch (error) {
        return res.status(500).json({ 
          message: "Erreur lors de la mise à jour de l'inscription",
          error: error.message 
        });
      }
    },
  
    // Supprimer une inscription
    async delete(req, res) {
      try {
        const inscription = await Inscription.findByPk(req.params.id);
        if (!inscription) {
          return res.status(404).json({ 
            message: "Inscription non trouvée" 
          });
        }
        await inscription.destroy();
        return res.json({ message: "Inscription supprimée avec succès" });
      } catch (error) {
        return res.status(500).json({ 
          message: "Erreur lors de la suppression de l'inscription",
          error: error.message 
        });
      }
    }
  };

  module.exports= InscriptionController;