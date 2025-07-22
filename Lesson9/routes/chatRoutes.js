const express = require('express')
const router = express.Router()
const { getMessages } = require('../controller/chatController')
router.get("/", getMessages)
module.exports = router