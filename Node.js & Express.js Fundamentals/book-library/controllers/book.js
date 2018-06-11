let Book = require('../models/Book');

module.exports = {
    addGet: (req, res) =>{
       res.render('book/add');
    },
    addPost: (req, res) => {
        let book = req.body;

        book.releaseDate = new Date(book.releaseDate);

        Book.create(book)
         .then(()=>{
             res.redirect('/books/all');
         })
    },
    all: (req, res)=>{
        Book.find()
            .then(books=>{
                res.render('book/all', {books});
            });
    },
    details: (req, res)=>{
        let bookId = req.params.id;

        Book.findById(bookId)
            .then(book=>{
                res.render('book/details', {book});
            });
    }
}