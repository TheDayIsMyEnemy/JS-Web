const url = require('url');
const database = require('../config/database.js');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const multiparty = require('multiparty');
const shortid = require('shortid');

module.exports = (req, res) => {
    req.pathname = req.pathname || ulr.parse(req.url).pathname;
    if(req.pathname === '/product/add' && req.method === 'GET'){
        let filePath = path.normalize(
            path.join(__dirname, '../views/products/add.html'));
        fs.readFile(filePath, (err,data)=> {
            if(err){
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 not found');
                res.end();
                return;
            }
            res.writeHead(200,{
                'Content-Type':'text/html'
            });

            res.write(data);
            res.end();

        });
    }
    else if(req.pathname === '/product/add' && req.method === 'POST'){
        let form = new multiparty.Form();
        let product = {};
        form.on('part', (part) => {
            if(part.filename){
                let dataString = "";

                part.setEncoding('binary');
                part.on('data', (data)=>{
                    dataString+=data;
                });

                part.on('end', ()=>{
                    let filename = shortid.generate();
                    let extension = part.filename.substring(part.filename.indexOf('.'));
                    let filepath = `content/images/${filename}${extension}`;

                    product.image = filepath;
                    fs.writeFile(
                        `${filepath}`, dataString, {encoding: 'ascii'}, (err) => {
                            if(err){
                                console.log(err);
                                return;
                            }
                        }
                    );
                });
            }
            else{
                part.setEncoding('utf-8');
                let field = '';
                part.on('data', (data)=>{
                    field+= data;
                });

                part.on('end', ()=> {
                    product[part.name] = field;
                });
            }
        });
        
        form.on('close', ()=>{
            database.products.add(product);
            res.writeHead(302, {
               Location: '/' 
            });

            res.end();
        });

        form.parse(req);
    
    }
    else{
        return true;
    }
}