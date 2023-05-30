const { default: mongoose } = require("mongoose");


const UserSchema = mongoose.Schema({
    email:String,
    password:String,
    createdAt:String,
    plan:String,
    emailVerified:String,
    verificationCode:String
})

module.exports = mongoose.model('User',UserSchema)