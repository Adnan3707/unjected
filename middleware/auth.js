const db = require("../models");
const User = db.user;
const Models = db.models ;
const Op = db.Sequelize.Op;

module.exports = {
    ensureAuthenticated: function (req, res, next) {
        console.log(req.isAuthenticated())
        if (req.isAuthenticated()) {
            return next();
        }
       return res.status(400).json({msg:'Login Again'})
        // req.flash('error_msg', 'Please log in to view that resource');
        // res.redirect('/users/login');
    },
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        // res.redirect('/dashboard');
    },
    ensureAdminAuthenticated:async function (req,res,next){
        try{
            let user = await   db.us_user_permission.findOne({where :{
                user_id:req.user.id
              }})
              if(user.name  != null){
              return  user.name === 'ADMIN' ?  next() : ''
              }
        } catch(err){
            return res.status(400).json({msg:`unauthorized , Mistmatch ${err}`})
        }
          }
};
