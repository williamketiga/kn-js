const postController = require('./postController')
const postModel = require('../models/postModel')
exports.showHomeIndex = (req,res) => {
    res.render('home/index')
}
exports.showFeedsIndex = async (req,res) => {
    console.log(`Session now ${req.session}`);
    const posts = await postModel.find().sort({createdAt:-1}).populate('userId', 'username')
    res.render('feeds/index',{
        user : req.session.user,
        username : req.session.user.username,
        userId : req.session.user._id,
        posts
    })
}