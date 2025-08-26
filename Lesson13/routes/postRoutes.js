const express = require('express')
const router = express.Router();
const postController = require('../controllers/postController')
router.get('/all', postController.getAllPosts)
router.get('/', postController.showPostForm)
router.post('/', postController.createPost)
router.get('/:id', postController.showEditForm)
router.put('/:id', postController.editPost)
router.delete('/:id', postController.deletePost)
module.exports = router