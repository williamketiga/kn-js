const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const authRoutes = require('./routes/authRoutes')
const messageRoutes = require('./routes/messageRoutes')
const path = require('path')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 5000
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
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})