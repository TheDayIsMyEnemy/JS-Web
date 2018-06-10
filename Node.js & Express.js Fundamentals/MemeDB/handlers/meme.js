let Genre = require('../models/Genre');
let Meme = require('../models/Meme');

module.exports = {
    addGet: (req, res) => {
        Genre.find().then((genres) => {
            res.render('meme/add', { genres: genres });
        })

    },
    addPost: (req, res) => {
        let meme = req.body;
        meme.image = '\\' + req.file.path;

        Meme.create(meme).then(meme => {
            Genre.findById(meme.genre)
                .then(genre => {
                    genre.memes.push(meme._id);
                    genre.save();
                });
        });

        res.redirect('/meme/all');
    },
    viewAll: (req, res) => {
        Meme.find().then(memes=>{
            res.render('meme/all', {memes: memes});
        })

    },
    details: (req, res) =>{
        let id = req.params.id;
        Meme.findById(id)
            .then(meme=> {
                if(!meme){
                    res.sendStatus(404);
                    return;
                }
                res.render('meme/details', {meme});
            })
    }
}