const express = require('express');
const router = express.Router();
const leconController = require('../controllers/leconController');

router.get('/cours/:coursId/lecons', leconController.getAllLecons);
router.post('/cours/:coursId/lecons', leconController.createLecon);
router.put('/lecons/:id', leconController.updateLecon);
router.delete('/lecons/:id', leconController.deleteLecon);

module.exports = router;