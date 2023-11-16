const express = require('express');
const router = express.Router();
const {ensureAuthenticated, forwardAuthenticated} = require('../middleware/auth');

const {Con_Use} = require('../utils/Cog_Aws')

const db = require(process.env.data_base);

// Welcome Page
router.get('/', (req, res) => {
 return res.status(200).json({'logged in for user' : req.user})
// return res.status(200).json({'STATUS':'SERVER RUNNING'})
});

// // Dashboard
// router.get('/dashboard', ensureAuthenticated, (req, res) =>
//     res.status(200).json(req.user,'user Logged in sucess',
//     )
// );

router.get('/martial',ensureAuthenticated,async (req,res)=>{
    try{
    let Vie_Mar_Sta =await db.sequelize.query(`SELECT * from us_profile_marital_status`)
    return res.status(200).json({'data': Vie_Mar_Sta})
        }catch(err){
            return res.status(400).json({ 'server error':err })
        }
})
router.get('/interest',ensureAuthenticated,async (req,res)=>{
    try{
    let Vie_Mar_Sta =await db.sequelize.query(`SELECT * from us_user_interest`)
    return res.status(200).json({'data': Vie_Mar_Sta})
        }catch(err){
            return res.status(400).json({ 'server error':err })
        }
})
router.get('/language',ensureAuthenticated,async (req,res)=>{
    try{
    let Vie_Mar_Sta =await db.sequelize.query(`SELECT * from us_profile_language`)
    return res.status(200).json({'data': Vie_Mar_Sta})
        }catch(err){
            return res.status(400).json({ 'server error':err })
        }
})
router.get('/looking-for',ensureAuthenticated,async (req,res)=>{
   try{
    let Vie_Mar_Sta =await db.sequelize.query(`SELECT * from us_profile_looking_for`)
    return res.status(200).json({'data': Vie_Mar_Sta})
        }catch(err){
            return res.status(400).json({ 'server error':err })
        }
})

router.get('/profession',ensureAuthenticated,async (req,res)=>{
    try{
    let Vie_Mar_Sta =await db.sequelize.query(`SELECT * from us_profile_profession`)
    return res.status(200).json({'data': Vie_Mar_Sta})
        }catch(err){
            return res.status(400).json({ 'server error':err })
        }
})
router.get('/star-sign',ensureAuthenticated,async (req,res)=>{
        try{
    let Vie_Mar_Sta =await db.sequelize.query(`SELECT * from us_profile_starsign`)
    return res.status(200).json({'data': Vie_Mar_Sta})
        }catch(err){
            return res.status(400).json({ 'server error':err })
        }
})

router.get('/verify', async (req,res)=>{
    let {cognito,code} = req.body ;
    await Con_Use(cognito,code).then((data)=> res.status(200).json({data})).catch(error=>res.status(400).json({'error' :error}))
  
  })
module.exports = router;
