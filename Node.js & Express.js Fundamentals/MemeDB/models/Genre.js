let mongoose = require('mongoose');

let genreSchema = new mongoose.Schema({
    name: String,
    memes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meme'
    }]
});

let Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;