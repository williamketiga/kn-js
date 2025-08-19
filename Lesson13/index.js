const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const path = require('path')
require('dotenv').config()
const authRoutes = require('./routes/authRoutes')
const app = express()
const PORT = process.env.port || 5000
app.use('/auth', authRoutes)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(err => console.err("MongoDB connection error", err))
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})