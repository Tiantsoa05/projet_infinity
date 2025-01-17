const {Cours} = require('../models/model')
const {validationError, DatabaseError} = require('sequelize');


//Classe Controller du cours 

class CoursController {
    async creerCours(req, res) {
      try {
          const {nom, description, langue, niveau_difficulte, duree, prix} = req.body;
          if(!nom || !langue) {
              return res.status(400).json ({
                  message: 'Le nom et la langue sont requis'
              }); 
          }

          const nouveauCours = await Cours.create({
              nom,
              description,
              langue,
              niveau_difficulte,
              duree,
              prix,
          });

          return res.status(201).json({
              message: 'Cours crée avec succès',
              data: nouveauCours
          });
      }catch(error) {
          if(error instanceof validationError) {
            return res.status(400).json ({
                message: 'Erreur de validation',
                errors:  error.error.map(e => e.message)
            });
          }
        return res.status(500).json({
            message:'Erreur lors de la création du cours',
            error: error.message
        })
      }       
    }

    //récupérer tous les cours 
    async obtenirTousLesCours (req, res) {
        try {
            const{niveau_difficulte, langue} = req.query;

            let whereClause = {}

            //Filtrage mais ce filtrage est optionnel
            if (niveau_difficulte) {
                whereClause.niveau_difficulte = niveau_difficulte
            }

            if(langue) {
                whereClause.langue = langue
            }

            const cours = await Cours.findAll({
                where: whereClause,
                order: [['createdAt', 'DESC']]
            });

            return res.status(200).json({
                success: true,
                data: cours
            });
            
        }catch (error) {
            return res.status(500).json({
                succes: false,
                message: 'Erreur lors de la récupération des cours',
                error: error.message
            });
        }
    }

    // Récuperation de cours par son Identifiant ID 
    async obtenirCoursParId(req, res) {
        try {
            const {id} = req.parms; 
            const cours  =  await Cours.findByPk(id);


            if (!cours) {
                return res.status(404).json({
                    success: false,
                    message: 'Cours non trouvé'
                });
            }

            return res.status(200).json({
                success: true,
                data: cours
            })
        }catch (error) {
            return res.status(500).json ({
                success: false,
                message: 'Erreur lors de la récupération du cours',
            });

        }
    }

    // Mettre à jour un cours
  async mettreAJourCours(req, res) {
    try {
      const { id } = req.params;
      const { nom, description, langue, niveau_difficulte, duree, prix } = req.body;

      const cours = await Cours.findByPk(id);

      if (!cours) {
        return res.status(404).json({
          success: false,
          message: 'Cours non trouvé'
        });
      }

      // Mise à jour du cours
      await cours.update({
        nom,
        description,
        langue,
        niveau_difficulte,
        duree,
        prix
      });

      return res.status(200).json({
        success: true,
        message: 'Cours mis à jour avec succès',
        data: cours
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({
          success: false,
          message: 'Erreur de validation',
          errors: error.errors.map(e => e.message)
        });
      }
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour du cours',
        error: error.message
      });
    }
  }

  // Supprimer un cours
  async supprimerCours(req, res) {
    try {
      const { id } = req.params;
      const cours = await Cours.findByPk(id);

      if (!cours) {
        return res.status(404).json({
          success: false,
          message: 'Cours non trouvé'
        });
      }

      await cours.destroy();

      return res.status(200).json({
        success: true,
        message: 'Cours supprimé avec succès'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression du cours',
        error: error.message
      });
    }
  }
}

module.exports = new CoursController();