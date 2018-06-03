const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    price: {type: Number, min:0, max: Number.MAX_VALUE, default:0},
    image:{},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    isBought: {type: mongoose.Schema.Types.Boolean, default:false}
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;