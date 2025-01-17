const MessageController = require('../controllers/MessageController')
const router = require('express').Router()

router.post('/save',MessageController.saveMessage)

router.post('/get',MessageController.listMessages)

module.exports = router
