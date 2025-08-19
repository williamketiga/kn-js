const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
router.get('/register', authController.showRegister)
router.post('/register', authController.registerUser)
router.get('/login', authController.showLogin)
router.post('/login', authController.loginUser)
router.get('/logout', authController.logoutUser)
module.exports = router