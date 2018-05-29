let products = [];
let count = 1;

const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '/database.json');

function getProducts(){
    let products = [];
        
    if(fs.existsSync(dbPath)){
        let json = fs.readFileSync(dbPath).toString();
        products = JSON.parse(json);
    }
    else{
        fs.writeFileSync(dbPath, '[]');
    }

    return products;
}

function saveProducts(products){
    let json = JSON.stringify(products);
    fs.writeFileSync(dbPath,json);
}

module.exports.products = {};
module.exports.products.getAll = getProducts;

module.exports.products.add = (product) => {
   let products = getProducts();
   product.id = products.length +1;
    products.push(product);
    saveProducts(products);
}

module.exports.products.findByName = (name) => {
    return getProducts().filter(p=> p.name.toLowerCase().includes(name));
};