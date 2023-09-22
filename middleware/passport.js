const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');

//IDs
//Database
const db = require("../models");

module.exports =  function (passport) {
    //local
    passport.use(
        new LocalStrategy({usernameField: 'email'}, async  (email, password, done) => {
            // Match user
            try{
              let user = await  db.us_user.findOne({where:{'email': email }})
               if(!user || user.deleted_at != null ){
                done(null,false)
               }
           // Match password if matched i.e Ok
            done(null, user);
            }catch(err){
                if (err) throw err;
                done(null, false);
            }

                // Match password
                // bcrypt.compare(password, user.password, (err, isMatch) => {
                //     if (err) throw err;
                //     if (isMatch) {
                //         return done(null, user);
                //     } else {
                //         return done(null, false, {message: 'Password incorrect'});
                //     }
                // });

        })
    );


    passport.serializeUser(function (user, done) {
        done(null, user.email);
    });

    passport.deserializeUser(async function  (id, done) {
        try{
              let user = await   db.us_user.findOne({where :{
                  'email':id
                }})
                if(!user){
                    done(null,false)
                   }
         done(null,user);
          }catch(err){
        done(err,null)
          }
    });


};
