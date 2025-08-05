const mongoose = require('mongoose')
const Message = require('../model/messageModel')
const User = require('../model/userModel')
exports.getAllMessages = async(req,res) => {
    const messages = await Message.find().sort({createdAt : -1})
    res.render('index', {messages})
}
exports.createMessage = async(req,res) => {
    const {sender, reciever, content} = req.body
    try{
        await Message.create({
            sender,
            reciever,
            content
        })
    } catch(e) {
        console.error(`Error creating message: ${e}`);
    }
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
exports.getMessageForm = async(req,res) => {
    const users = await User.find({
        _id : {
            $ne : req.session.user.id
        }
    })
    console.log(users);
    res.render('form', {users})
}