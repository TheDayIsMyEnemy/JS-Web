const handlers = require('../handlers');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './content/images')
    },
    filename: function (req, file, cb) {
      let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      cb(null, Date.now() + ext);
    }
  })
  var upload = multer({ storage: storage });
  //let upload = multer({dest: './content/images'});

module.exports = (app) => {
    app.get('/', handlers.home.index);

    app.get('/product/add', handlers.product.addGet);
    app.post('/product/add', upload.single('image'), handlers.product.addPost);
    app.get('/product/edit/:id', handlers.product.editGet);
    app.post('/product/edit/:id', upload.single('image'), handlers.product.editPost);
    app.get('/product/delete/:id', handlers.product.deleteGet);
    app.post('/product/delete/:id', handlers.product.deletePost);
    app.get('/product/buy/:id', handlers.product.buyGet);

    app.get('/category/add', handlers.category.addGet);
    app.post('/category/add', handlers.category.addPost);
    app.get('/category/:category/products', handlers.category.productByCategory);
}