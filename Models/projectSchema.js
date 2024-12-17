// import mongoose
const mongoose = require('mongoose')

const projecSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true

    },
    projectImg: {
        type: String,
        required: true
    },
    userId: {
        type: String,
    }
})

//3. model creation
const projects = mongoose.model('projects', projecSchema)
module.exports = projects