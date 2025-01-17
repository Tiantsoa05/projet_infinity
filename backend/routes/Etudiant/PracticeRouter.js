const router = require('express').Router()
const PracticeController = require('../../controllers/Etudiant/PracticeController')

router.post("/practice",PracticeController.fetchDictionnaryWord)

module.exports = router