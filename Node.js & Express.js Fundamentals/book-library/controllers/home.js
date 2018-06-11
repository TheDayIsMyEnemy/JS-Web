let Book = require('../models/Book');

module.exports.index = (req, res) => {

    Book.find()
        .then(books => {
            let count = books.length;
            res.render('home',{count});
        })

}
