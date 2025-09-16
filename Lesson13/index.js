const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const path = require('path')
require('dotenv').config()
const authRoutes = require('./routes/authRoutes')
const homeRoutes = require('./routes/homeRoutes')
const postRoutes = require('./routes/postRoutes')
const app = express()
const PORT = process.env.port || 5000
app.use(
    session({
        secret : process.env.JWT_PHRASE,
        resave : false,
        saveUninitialized : false,
        cookie : {
            maxAge : 1000 * 3600,
            
        }
    })
)
app.use(express.json())
app.use(express.urlencoded({
    extended : true
}))
app.use('/auth', authRoutes)
app.use('/', homeRoutes)
app.use('/post', postRoutes)
app.use('/bootstrap', express.static(path.join(__dirname,'node_modules/bootstrap')))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(err => console.err("MongoDB connection error", err))
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})