const mongoose = require('mongoose')
const Message = require('../model/messageModel')
const User = require('../model/userModel')
const crypto = require('crypto')
const {encrypt, decrypt} = require('../middleware/crypto')
exports.getAllMessages = async(req,res) => {
    try {
        const userId = req.session.user.id
        const messages = await Message.find({
            $or : [
                {sender : userId},
                {receiver : userId},
            ],
            iv : {$exists : true}
        })
        .populate('sender', 'username')
        .populate('receiver', 'username')
        .sort({createdAt:-1})
        console.log(`Message Retrieve : ${messages}`);
        if (!messages.length) {
            return res.render('index', {
                messages : [],
                noMessages : true,
                session : req.session
            })
        }
        const decryptedMessage = messages.map(msg=>{
            const decrypted = decrypt(msg.content, msg.iv)
            return {
                ...msg.toObject(),
                content : decrypted
            }
        })
        res.render('index', {
            messages : decryptedMessage,
            noMessages : false,
            session : req.session
        })
    } catch (err) {
        console.error(`Error ${err}`)
        res.status(500).send('Error fetching messages')
    }
}
exports.createMessage = async(req,res) => {
    const {receiver, content} = req.body
    console.log(content)
    const sender = req.session.user.id
    const encryptedContent = encrypt(content)
    try{
        const message = await Message.create({
            sender,
            receiver,
            content: encryptedContent.data,
            iv: encryptedContent.iv
        })
        const receiverSocket = req.onlineUsers[receiver]
        if (receiverSocket){
            req.io.to(receiverSocket).emit('newMessage', {
                from: req.session.username,
                content: 
            })
        }
    } catch(e) {
        console.error(`Error creating message: ${e}`);
    }
    res.redirect('/')
}
exports.getMessageById = async(req,res) => {
    try {
        const message = await Message.findById(req.params.id)
        .populate('sender', 'username')
        .populate('receiver', 'username')
        if (!message) {
            return res.status(404).send('Message not found!')
        }
        const decryptedMessage = {
            ...message.toObject(),
            content : decrypt(message.content, message.iv)
        }
        res.render('detail', {
            message : decryptedMessage
        })
    } catch(err) {
        console.error(`Error fetching message ${err}`)
        res.status(500).send('Internal Server Error')
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