const mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
    name: {type: String, required: true},
    creator: {type: mongoose.Schema.ObjectId, ref: 'User', requried: true},
    products: [{type:mongoose.Schema.Types.ObjectId, ref: 'Product'}]
});

let Category = mongoose.model('Category', categorySchema);

module.exports = Category;