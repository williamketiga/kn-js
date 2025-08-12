const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const authRoutes = require('./routes/authRoutes')
const messageRoutes = require('./routes/messageRoutes')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')
require('dotenv').config()
const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 5000
const io = new Server(server)
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(err => console.err("MongoDB connection error", err))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(session({
    secret : process.env.JWT_SECRET_KEY,
    resave : false,
    saveUninitialized : false
}))
app.use(express.urlencoded({ extender: true }))
app.use(express.json())
app.use(express.static('public'))
app.use('/', messageRoutes)
app.use('/auth', authRoutes)
app.use((req,res,next)=>{
    req.io = io
    req.onlineUsers = onlineUsers
    next()
})
io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`)
    socket.on('register', (userId) => {
        onlineUsers[userId] = socket.id
        console.log(`User ${userId} registered with socket ${socket.id}`)
    })
    socket.on('disconnect', ()=>{
        for(let id in onlineUsers){
            if (onlineUsers[id] === socket.id){
                delete onlineUsers[id]
                break
            }
        }
        console.log(`User disconnected from socket ${socket.id}`)
    })
})
server.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})