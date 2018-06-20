const User = require('../models/User');
const encryption = require('../utilities/encryption');

module.exports = {
    registerGet: (req, res) =>{
        res.render('user/register')},

    registerPost: (req, res)=>{
        let user = req.body;

        if(user.password && user.password !== user.confirmedPassword){
            user.error = 'Passwords do not match.';
            res.render('user/register', user);
            return;
        }

        let salt = encryption.generateSalt();
        user.salt = salt;

        if(user.password){
            let hashedPassword = encryption.generateHashedPassword(salt, user.password);
            user.password = hashedPassword;
        }

        User.create(user)
            .then(user=>{
                req.logIn(user, (error,user)=>{
                    if(error){
                        res.render('user/register', {error: 'Authentication not working!'});
                        return;
                    }

                    res.redirect('/');
                })
            }).catch(error=>{
                user.error = error;
                res.render('user/register', user);
            })
    }
    ,

    loginGet: (req, res)=>{
        res.render('user/login');
    },

    loginPost: (req, res)=>{
        let userToLogin = req.body;

        User.findOne({username: userToLogin.username}).then(user=>{
            if(!user || !user.authenticate(userToLogin.password)){
                res.render('user/login', {error: 'Invalid credentials'});
            }
            else{
                req.logIn(user, (error, user) => {
                    if(error){
                        res.render('user/login', {error: 'Authentication failed'})

                        return;
                    }
                })

                res.redirect('/');
            }
        })
    },

    logout: (req, res)=>{
        req.logout();
        res.redirect('/');
    }
}


