const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');
const axios = require('axios');
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
           const Sho = await axios({
            url: `https://${process.env.Shopify_Key}:${process.env.Shopify_Token}@${process.env.Shopify_Store}.myshopify.com/admin/api/2022-07/customers/search.json?query=email:${user.email}`,
            method: "get",
        });
        let Ver_Dat = Sho.data.customers.filter((obj)=> user.email == obj.email && obj.tags.indexOf("Unjected-OG") !== -1)
        Ver_Dat.length > 0 ? user['verified'] = true : user['verified'] = false
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
