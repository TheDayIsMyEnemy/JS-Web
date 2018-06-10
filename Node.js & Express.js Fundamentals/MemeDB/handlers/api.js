const router = require('express').Router();
const Meme = require('../models/Meme');
const Genre = require('../models/Genre');
const fs = require('fs');
const path = require('path');

const all = (req, res) => {
    Meme.find().then(memes => {
        res.json(memes);
    });
};

const byId = (req, res) => {
    let id = req.params.id;
    Meme.findById(id)
        .populate('genre')
        .then(meme => {
            res.json(meme);
        });
};

const remove = (req, res) => {
    let id = req.params.id;
    
    Meme.findByIdAndRemove(id)
        .then(deletedMeme => {
            let imagePath = path.normalize(path.join(__dirname, '..' + deletedMeme.image));
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }

                Genre.findById(deletedMeme.genre)
                    .then(genre => {
                        let index = genre.memes.indexOf(deletedMeme._id);
                        if (index >= 0) {
                            genre.memes.splice(index, 1);
                        }

                        genre.save();
                        res.json(deletedMeme);
                    });
            });
        });
};

router
    .get('/memes/all', (req, res) => all(req, res))
    .get('/memes/:id', (req, res) => byId(req, res))
    .delete('/memes/:id', (req, res) => remove(req, res));

module.exports = router;