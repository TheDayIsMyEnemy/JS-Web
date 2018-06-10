const Genre = require('../models/Genre');

module.exports = {
    addGet: (req, res)=>{
        res.render('genre/add');
    },
    addPost: (req, res)=>{
        let genre = req.body;
        
        Genre.create(genre)
            .then(()=>{
                res.redirect('/');  
            })
    }
    
}