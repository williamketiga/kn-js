const express = require('express')
const router = express.Router()
const messageController = require('../controller/messageController')
router.get('/', messageController.getAllMessages)
router.get('/create', messageController.getMessageForm)
router.post('/create', messageController.createMessage)
router.get('/detail/:id', messageController.getMessageById)
router.post('/delete/:id', messageController.deleteMessage)
module.exports = router