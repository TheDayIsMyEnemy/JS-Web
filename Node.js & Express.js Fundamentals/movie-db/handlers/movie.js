const fs = require('fs');
const path = require('path');
const db = require('../config/dataBase');
const qs = require('querystring')

module.exports = (req,res) => {
    let filePath;
    if(req.url === '/addMovie' && req.method === 'GET'){
        filePath = path.normalize(path.join(__dirname, '../views/addMovie.html'));

        const src = fs.createReadStream(filePath);
        res.writeHead(200, {
            'Content-Type':'text/html'
        });
        src.pipe(res);

       
    }
    else if(req.url === '/viewAllMovies' && req.method === 'GET'){
        filePath = path.normalize(path.join(__dirname, '../views/viewAll.html'));
        fs.readFile(filePath, (err,data)=>{
            if(err){
                console.log(err);
                return;
            }

            res.writeHead(200, {
                'Content-Type':'text/html'
            });

            let content;
            let index=0;
            for (const movie of db) {
                content +=
                    `
                <div class="movie">
                    <a href="/movies/details/${index++}"><img class="moviePoster" src="${decodeURIComponent(movie.moviePoster)}"/>          
                </div>
                `
            }
            
            let html = data.toString().replace('{{replaceMe}}', content)

            res.write(html);
            res.end();
        });
        
    }
    else if (req.url === '/addMovie' && req.method === 'POST') {
        let body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            let movieData = qs.parse(body);

            db.push(movieData);

            res.writeHead(302, {
                    Location: '/viewAllMovies'
            });

            res.end();
        })
    }
    else if(req.url.startsWith('/movies/details') && req.method === "GET"){

        let index = Number(req.url.split('/').pop());
        

        filePath = path.normalize(path.join(__dirname, '../views/details.html'));
        fs.readFile(filePath, (err,data)=>{
            if(err){
                console.log(err);
                return;
            }

            res.writeHead(200, {
                'Content-Type':'text/html'
            });

            let movie = db[index];

            let content = `<div class="content">
                <img src="${decodeURIComponent(movie.moviePoster)}" alt=""/>
                <h3>Title ${movie.movieTitle} </h3>
                <h3>Year ${movie.movieYear} </h3>
                <p>${movie.movieDescription}</p>
                </div>`;
            
            let html = data.toString().replace('{{replaceMe}}', content)

            res.write(html);
            res.end();
        });
    }
    else{return true;}

}