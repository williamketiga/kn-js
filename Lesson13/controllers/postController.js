const { cloudinary } = require('../config/cloudinary');
const Post = require('../models/postModel')
exports.showPostForm = async(req,res) => {
    res.render('posts/create')
}
exports.createPost = async(req,res) => {
    try{
        const userId = req.session.user.id
        const {caption} = req.body
        // const imageUrl = req.files?.image ? req.files.image[0].path : null
        // const videoUrl = req.files?.video ? req.files.video[0].path : null
        res.redirect('/feeds')
        processUploadInBackground(req.files,userId,caption)
    } catch(error){
        console.error(`Error : ${error}`)
    }
}
async function processUploadInBackground(files,userId,caption){
    try{
        let imageUrl = null
        let videoUrl = null
        if (files?.image){
            console.log('Uploading image')
            const result = await cloudinary.uploader.upload(
                files.image[0].path,
                {
                    folder : "posts/images"
                }
            )
            imageUrl = result.secure_url
        }
        if (files?.video){
            console.log('Uploading video')
            const result = await cloudinary.uploader.upload(
                files.video[0].path,
                {
                    folder : "posts/videos"
                }
            )
            imageUrl = result.secure_url
        }
        await Post.create({
            userId,
            caption : caption?.trim() || '',
            imageUrl,
            videoUrl
        })
        console.log('Post created successfully');
        
    } catch(err) {
        console.error(`Error ${err}`);
    }
}
exports.showEditForm = async(req,res) => {
    try{
        const post = await Post.findById(req.params.id).populate('userId','username')
        if (!post){
            console.error(`Post not found`)
            res.status(404).send('Post not found')
        }
        res.render('post/edit',post)
    } catch(error){
        console.error(`Error : ${error}`);
    }
}
exports.editPost = async(req,res) => {
    try{
        const post = await Post.findById(req.params.id).populate('userId','username')
        const {newCaption, newImageUrl, newVideoUrl} = req.body
        if (!post){
            console.error(`Post not found`)
            res.status(404).send('Post not found')
        }
        post.updateOne(
            {id : post.id},
            {$set : {
                caption : newCaption,
                imageUrl : newImageUrl,
                videoUrl : newVideoUrl
            }}
        )
        res.status(200).send('Post updated successfully')
    } catch(error){
        console.error(`Error : ${error}`)
    }
}
exports.getAllPosts = async(req,res) => {
    try{
        const posts = await Post.find().sort({
            createdAt : -1
        })
        if (!posts){
            console.error(`Failed to load posts ${posts}`)
        }
        console.log(posts);
        res.render('feeds/index', {
            posts : posts
        })
    } catch(error){
        console.error(`Error : ${error}`)
    }
}
exports.deletePost = async(req,res) => {
    try{
        const {id} = req.params
        const post = await Post.findByIdAndDelete(id)
        if (!post){
            res.status(404).send('Post not found')
        }
        res.render('post/index')
    } catch(error){
        console.error(`Error : ${error}`)
    }
}