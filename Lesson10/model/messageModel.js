const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema({
    sender : {
        type : String,
        ref : 'User',
        required : true
    },
    receiver : {
        type : String,
        ref : 'User',
        required : true
    },
    content : {
        type : String,
        required : true
    },
    iv : String
}, {timestamps : true})
module.exports = mongoose.model('Message', messageSchema)