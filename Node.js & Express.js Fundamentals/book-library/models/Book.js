const mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
    },
    image: {
        type: mongoose.Schema.Types.String
    },
    releaseDate: {
        type: mongoose.Schema.Types.Date
    },
    author: {
        type: mongoose.Schema.Types.String
    }
});

let Book = mongoose.model('Book', bookSchema);

module.exports = Book;