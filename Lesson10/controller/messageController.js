const Message = require('../model/messageModel')
exports.getAllMessages = async(req,res) => {
    const messages = await Message.find().sort({createdAt : -1})
    res.render('index', {messages})
}
exports.createMessage = async(req,res) => {
    const {sender, content} = req.body
    await Message.create({sender,content})
    res.redirect('/')
}
exports.getMessageById = async(req,res) => {
    const message = await Message.findById(req.params.id)
    if (message){
        res.render('detail', {message})
    } else {
        res.status(404).send('Message not found')
    }
}
exports.deleteMessage = async(req,res) => {
    await Message.findByIdAndDelete(req.params.id)
    res.redirect('/')
}
exports.getMessageForm = (req,res) => {
    res.render('form')
}