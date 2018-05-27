const fs = require('fs');
const path = require('path');
const url = require('url');

function getContentType (path){
    let index = path.indexOf('.');
    if(index != -1){
        let type = path.substring(index+1);

        if(type == "css"){
            return "text/css";
        }
        else if(type == "ico"){
            return "image/x-icon";
        }
    }
}

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(url).pathname;

    if(req.pathname.startsWith('/content/') && req.method === 'GET'){
        let filePath = path.normalize(
            path.join(__dirname, `..${req.pathname}`));

        fs.readFile(filePath, (err, data) => {
            if(err){
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('Resource not found!');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': getContentType(req.pathname)
            });

            res.write(data);
            res.end();
        });
    }
    else{
        return true;
    }
}