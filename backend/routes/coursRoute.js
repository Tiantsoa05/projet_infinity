const express = require ('express');
const router = express.Router();
const coursController = require('../controllers/coursController');


//Routes CRUD pour les cours 

router.post('/', coursController.creerCours);
router.get('/', coursController.obtenirTousLesCours);
router.get('/:id', coursController.obtenirCoursParId);
router.put('/:id', coursController.mettreAJourCours);
router.delete('/:id', coursController.supprimerCours);


module.exports = router

