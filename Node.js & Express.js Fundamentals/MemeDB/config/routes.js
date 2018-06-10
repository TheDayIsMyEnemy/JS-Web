const handlers = require('../handlers');
const multer = require('multer');

let upload = multer({
    dest: './public/memes'
});

module.exports = (app) => {   
    app.get('/', handlers.home.index);

    app.get('/meme/add', handlers.meme.addGet);
    app.post('/meme/add', upload.single('image'), handlers.meme.addPost);
    app.get('/meme/all', handlers.meme.viewAll);
    app.get('/meme/details/:id', handlers.meme.details);

    app.get('/genre/add', handlers.genre.addGet);
    app.post('/genre/add', handlers.genre.addPost);

    app.use('/api', handlers.api);

}