const Product = require('../models/Product');

module.exports.index = (req, res) => {
    let queryData = req.query;
    Product.find().populate('category').then((products) => {
        let content = "";

        if (queryData.query) {
            products = products.filter(v => v.name == queryData.query);
        }

        let data = {products: products};
        if(req.query.error){
            data.error = req.query.error;
        }else if(req.query.success){
            data.success = req.query.success;
        }

        //console.log(products);

        res.render('home/index',data);
    });
}   