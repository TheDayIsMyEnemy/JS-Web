const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = (config) => {
    mongoose.connect(config.connectionString);

    let db = mongoose.connection;

    db.on('error', (err) =>{
        console.log(err);
    });

    db.once('open', ()=>{
        console.log("Mongoose connected to database!");
    });

    require('../models/Genre');
    require('../models/Meme');
}