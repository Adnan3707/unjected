require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//Authorization
const passport = require('passport');
const {ensureAuthenticated,ensureAdminAuthenticated} = require('../middleware/auth');

const db = require(process.env.data_base);
const User = db.user;
const Models = db.models ;
const Op = db.Sequelize.Op;

router.get('/',async (req, res) => {
  try{
    // let all =  await Models.us_user.findAll({
    //     include:[
    //         {   as:"us_user_permission",
    //             model: Models.us_user_permission
    //         },
    //     ]
    //  })
    let users =  await db.us_user.findAll({ limit: 10})
    let admin = await db.us_user_permission.findAll({})
   let Nor_Use =  users.filter((obj)=>{
    return admin.some((id) =>{
        return obj.id != id.user_id
    })
    })
    return res.status(200).json({'LOGIN SUCCESS FOR ADMIN': Nor_Use})
  }catch(err){
    return res.status(400).json({ err:err })
  }

});
router.post('/disable', async (req, res) => {
  try{
    let {id} = req.body
    db.us_user_permission.destroy({
      where:{
        user_id: id
      }
    })
  return res.status(200).json({ msg:'User  Disabled Success'})
  }catch(err){
    return res.status(400).json({ 'server error':err })
  }

});
router.post('/enable', async (req, res) => {
  try{
    let {id} = req.body
    await db.us_user_permission.update({
      name:'user-verified-content'
    },{
     where:{
      user_id:id
     }
    })
    return res.status(200).json({ msg:'User  Enabled Success'})
  }catch(err){
    return res.status(400).json({ err:err })
  }

});

router.post('/delete',async(req,res)=>{
  try{

    let {cognito_user_id} = req.body
    await  db.us_user.update({
        deleted_at: true,
      }, {
        where: {
            cognito_user_id: cognito_user_id,
        },
      });
    return res.status(200).json({ msg:'User  Disabled Success'})
  }catch(err){
    return res.status(400).json({ err:err })
  }
})

router.get('/conversations',async(req,res)=>{
  try{
    let Use  = await db.us_user.findOne( {
      where: {
      cognito_user_id: cognito_user_id,
    }
  }) 
  
   let Mesa = await db.sequelize.query(`SELECT
   messages.id,
   messages.conversation_id,
   messages.conversation_participant_id,
   messages.body,
   messages.delivered
  FROM us_conversation_message AS messages
  INNER JOIN us_conversation_participant AS participants
  ON messages.conversation_participant_id = participants.id
  WHERE participants.user_id = ${Use.id} ;
   `)
  
   return res.status(200).json({ raw:Mesa })
  }catch(err){
    return res.status(400).json({ err:err })
  }


})

// view user
router.get('/user/:id',async (req,res)=>{
  let {id} = req.params ;
  try{
   let Use_Det =  await db.us_user.findAll(  {
      where: {
      email: id
    }
  });
  return res.status(200).json({ User:Use_Det})
}catch(err){
    return res.status(400).json({'error': err})
  }
})

// edit user
router.patch('/user/edit/:id',async (req,res)=>{
  let {id} = req.params ;
  let {first_name,last_name,birthday,gender,address,about_me,username} = req.body ;
  try{
    const updateValues = {
      first_name: first_name,
      last_name: last_name,
      birthday: birthday,
      gender: gender,
      address: address,
      about_me: about_me,
      username: username
    };
        for (const key in updateValues) {
          if (updateValues[key] === undefined) {
            delete updateValues[key];
          }
        }
    const [rowCount, updatedUsers] = await db.us_user.update(updateValues, {
      where: { 
        email: id 
      },
      returning: true, // Return the updated records
    });
    if (rowCount === 1) {
      return res.status(200).json({'Updated User:': updatedUsers[0].get()})
    } else {
      return res.status(200).json({'failure':'No user record was updated.'})
    }
  }catch(err){
    return res.status(400).json({'server error': err})
  }

})

router.get('/verified',async (req, res) => {
  try{
    let Ver_Use = await db.sequelize.query(`SELECT us_user.id, us_user.first_name, us_user.last_name,
    us_user.username, us_user.email, us_user_permission.user_id, us_user_permission.name, us_user.cognito_user_id FROM us_user JOIN us_user_permission ON us_user.id = us_user_permission.user_id `)
     return res.status(200).json({'Verified Users:-': Ver_Use})
  }catch(err){
    return res.status(400).json({'server error': err})
  }
});


module.exports = router ;