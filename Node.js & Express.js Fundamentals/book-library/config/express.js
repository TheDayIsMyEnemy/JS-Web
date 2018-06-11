const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = (app, config) => {
    app.engine('hbs', handlebars({
        extname: '.hbs',
        layoutsDir: 'views/layouts/',
        defaultLayout: 'main'
    }));
    app.set('view engine', 'hbs');

    app.use(bodyParser.urlencoded({ extended: true })); 

    app.use('/public', express.static(path.join(__dirname, '../public'))); 
}   