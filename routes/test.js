const db = require(process.env.data_base);
const express = require('express');
const router = express.Router();
router.get('/all',async (req, res) => {
    try{
        let user = await db.us_user.findAll({});
     return res.status(200).json({'user' :  user})
   }catch(err){
     return res.status(400).json({ 'server error':err })
   }
 });
 module.exports = router;