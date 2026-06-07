const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [4, 'Not a legit name bro']
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true,
        min: [10, 'Its not a book bro']
    }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;