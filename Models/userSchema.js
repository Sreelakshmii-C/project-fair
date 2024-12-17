// import mongoose
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    github: {
        type: String,
    },
    linkedIn: {
        type: String,
    },
    profilePic: {
        type: String,
    },
})

//3. model creation
const users = mongoose.model('users', userSchema)
module.exports = users