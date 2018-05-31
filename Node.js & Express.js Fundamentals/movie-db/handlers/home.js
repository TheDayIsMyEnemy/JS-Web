const fs = require('fs');
const path = require('path');

module.exports = (req,res) => {
    let filePath = path.normalize(path.join(__dirname, '../views/home.html'));
    if(req.url === '/' && req.method === 'GET'){
        const src = fs.createReadStream(filePath);
        res.writeHead(200, {
            'Content-Type':'text/html'
        });
        src.pipe(res);
    }
    else{return true;}

}