const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    userId : {
        ref : 'User',
        required : true,
        type : mongoose.Schema.ObjectId
    },
    caption : {
        required : false,
        type : String
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    imageUrl : {
        required : false,
        type : String,
        default : ''
    },
    videoUrl : {
        required : false,
        type : String,
        default : ''
    }
})
module.exports = mongoose.model('Post', postSchema)