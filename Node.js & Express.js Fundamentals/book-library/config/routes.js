const controllers = require('../controllers');
const multer = require('multer');

let upload = multer({
    dest: './public/images'
});

module.exports = (app) => {   
    app.get('/', controllers.home.index);

    app.get('/books/add', controllers.book.addGet);
    app.post('/books/add',controllers.book.addPost);
    app.get('/books/all', controllers.book.all);
    app.get('/books/details/:id', controllers.book.details);

}