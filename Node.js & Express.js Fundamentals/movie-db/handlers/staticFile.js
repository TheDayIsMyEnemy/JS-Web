const fs = require('fs');
const path = require('path');
const url = require('url');

const mimeTypes = {
    css:'text/css',
    ico:'image/x-icon',
    jpg:'image/jpeg',
    png:'image/png'
}

function getContentType (path){
    let type = path.split('.').pop();
    return mimeTypes[type];
}

module.exports = (req, res) => {
    if(req.url.startsWith('/public/') && req.method === "GET"){
        let filePath = path.normalize(path.join(__dirname,  `..${req.url}`));
        const src = fs.createReadStream(filePath);
        res.writeHead(200, {
            'Content-Type':getContentType(req.url)
        });
        src.pipe(res);
    }
    else{return true;}
}