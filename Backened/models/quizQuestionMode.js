const mongoose = require('mongoose');

const QuizQuestion = new mongoose.Schema({
    question: {
        type: String , 
        required: true,
        unique: true,
    },
    options:{
        type: Array,
        required: true,
    },
    correctOptionIndex: {
        type: Number,
        required: true,
    },
    imageUrl:{
        type: String
    },
    videoUrl:{
        type: String,
    }
});

module.exports = mongoose.model("QuizQuestion" , QuizQuestion);