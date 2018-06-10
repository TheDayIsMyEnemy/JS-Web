let mongoose = require('mongoose');

let memeSchema = new mongoose.Schema({
    name: String,
    title: String,
    creationDate: Date,
    votes: Number,
    description: String,
    image: String,
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }
});

let Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;
