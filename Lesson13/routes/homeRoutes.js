const express = require('express')
const router = express.Router();
const homeController = require('../controllers/homeController')
router.get('/', homeController.showHomeIndex)
router.get('/feeds', homeController.showFeedsIndex)
module.exports = router;