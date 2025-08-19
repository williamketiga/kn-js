const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    username : {
        required : true,
        type : String
    },
    password : {
        required : true,
        type : String
    },
    email : {
        required : true,
        type : String,
        unique : true
    },
    birth : {
        required : false,
        type : String
    }
})
userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
module.exports = mongoose.model('User', userSchema)