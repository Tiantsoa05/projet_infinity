const RessourceController = {
    // Créer une nouvelle ressource
    async create(req, res) {
      try {
        const { id_lecon } = req.body;
        
        // Vérifier que la leçon existe
        const lecon = await Lecon.findByPk(id_lecon);
        if (!lecon) {
          return res.status(404).json({ 
            message: "Leçon non trouvée" 
          });
        }
  
        const ressource = await Ressource.create(req.body);
        return res.status(201).json(ressource);
      } catch (error) {
        return res.status(500).json({ 
          message: "Erreur lors de la création de la ressource",
          error: error.message 
        });
      }
    },
  
    // Obtenir toutes les ressources
    async findAll(req, res) {
      try {
        const ressources = await Ressource.findAll({
          include: [{ model: Lecon }]
        });
        return res.json(ressources);
      } catch (error) {
        return res.status(500).json({ 
          message: "Erreur lors de la récupération des ressources",
          error: error.message 
        });
      }
    },
  
    // Obtenir une ressource par ID
    async findOne(req, res) {
      try {
        const ressource = await Ressource.findByPk(req.params.id, {
          include: [{ model: Lecon }]
        });
        if (!ressource) {
          return res.status(404).json({ 
            message: "Ressource non trouvée" 
          });
        }
        return res.json(ressource);
      } catch (error) {
        return res.status(500).json({ 
          message: "Erreur lors de la récupération de la ressource",
          error: error.message 
        });
      }
    },
  
    // Mettre à jour une ressource
    async update(req, res) {
      try {
        const ressource = await Ressource.findByPk(req.params.id);
        if (!ressource) {
          return res.status(404).json({ 
            message: "Ressource non trouvée" 
          });
        }
        await ressource.update(req.body);
        return res.json(ressource);
      } catch (error) {
        return res.status(500).json({ 
          message: "Erreur lors de la mise à jour de la ressource",
          error: error.message 
        });
      }
    },
  
    // Supprimer une ressource
    async delete(req, res) {
      try {
        const ressource = await Ressource.findByPk(req.params.id);
        if (!ressource) {
          return res.status(404).json({ 
            message: "Ressource non trouvée" 
          });
        }
        await ressource.destroy();
        return res.json({ message: "Ressource supprimée avec succès" });
      } catch (error) {
        return res.status(500).json({ 
          message: "Erreur lors de la suppression de la ressource",
          error: error.message 
        });
      }
    }
  };

  module.exports = RessourceController;