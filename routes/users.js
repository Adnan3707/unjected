const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//Authorization
const passport = require('passport');
const {forwardAuthenticated,ensureAuthenticated} = require('../middleware/auth');

//Database
const db = require(process.env.data_base);
const User = db.user;
const Models = db.models ;
const Op = db.Sequelize.Op;

// Login Page
router.get('/login',ensureAuthenticated, (req, res) => {

     return res.status(200).json({'LOGIN SUCCESS FOR': req.user})
});

// Register Page
// router.get('/register', (req, res) => res.render('register'));

// Register
router.post('/register', async (req, res) => {
    const {first_name, last_name, email,cognito_user_id,username,role,password} = req.body;
    let errors = [];

    if (!first_name || !last_name || !email ) {
        errors.push({msg: 'Please enter all fields'});
    }

    // if (password != password2) {
    //     errors.push({msg: 'Passwords do not match'});
    // }

    // if (password.length < 6) {
    //     errors.push({msg: 'Password must be at least 6 characters'});
    // }

    if (errors.length > 0) { console.log('error > 0')
    } else {
        let user = await  db.us_user.findOne({where:{'email': email }})
        if(user){
            res.status(400).json({'error': 'user Already Exists'})
            } else {

                // bcrypt.genSalt(10, (err, salt) => {
                //     bcrypt.hash(newUser.password, salt, (err, hash) => {
                //         if (err) throw err;
                //         newUser.password = hash;
                //         newUser
                //             .save()
                //             .then(user => {
                //                 req.flash(
                //                     'success_msg',
                //                     'You are now registered and can log in'
                //                 );
                //                 res.redirect('/users/login');
                //             })
                //             .catch(err => console.log(err));
                //     });
                // });
        const details =   await db.us_user.create({
                    'email':email,
                    'first_name':first_name,
                    'last_name':last_name,
                    'username': username ,
                    'cognito_user_id':cognito_user_id,
                    'deactivated':false
                })
        // if role Exists
        if(role == 'ADMIN'){
             await db.us_user_permission.create({
                user_id:details.id,
                name:'ADMIN'
             })

        }
            return    res.status(200).send({'done':'Admin User Created Sucessufully'})
            }
        
        }
})

// Login
router.post('/login', passport.authenticate('local'),(req, res, next) => {
 return res.status(200).json({'logged in for user' : req.user})
});

// // Login  Google
// router.get('/login/google', passport.authenticate('google'));

// // Login  FaceBook
// router.post('/login/facebook', passport.authenticate('facebook'),(req, res, next) => {
//     return res.status(200).json({'logged in for user' : req.user})
//    });   


// Logout
router.get('/logout', (req, res) => {
    req.logout();

    res.status(400).json('redirect to /users/login ')
});

module.exports = router;
