const Chat = require('../model/chatModel')
exports.getMessages = async(req,res) => {
    try{
        const chats = await Chat.find().sort({
            createdAt: 1
        }).limit(50)
        res.json(chats)
    } catch (error) {
        res.status(500).json({error : "Server error, failed to get message"})
    }
}
exports.saveMessages = async(data)=>{
    try{
        const chat = new Chat(data)
        await chat.save()
    } catch (err) {
        console.error("Error saving messages: ", err)
    }
}