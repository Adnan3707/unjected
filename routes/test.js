const db = require(process.env.data_base);
router.get('/all',ensureAuthenticated, (req, res) => {
    try{
        let user = db.us_user.findAll();
     return res.status(200).json({'user' :  user})
   }catch(err){
     return res.status(400).json({ 'server error':err })
   }
 });