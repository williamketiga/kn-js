const User = require('../model/userModel')
const bcrypt = require('bcrypt')
exports.showRegister = (req,res) => {
    res.render('register')
}
exports.showLogin = (req,res) => {
    res.render('login')
}
exports.registerUser = async(req,res) => {
    const { username , password } = req.body
    try{
        const user = new User({
            username,
            password
        })
        await user.save()
        res.redirect('/auth/login')
    } catch(err) {
        res.status(401).send("Registration failed : ", err.message)
    }
}
exports.loginUser = async(req,res) => {
    const { username , password } = req.body
    const user = await User.findOne({username})
    if (!user) {
        return res.redirect('/auth/login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.redirect('/auth/login')
    }
    req.session.user = {
        id : user._id,
        username : user.username
    }
    res.redirect('/')
}
exports.logoutUser = (req,res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login')
    })
}