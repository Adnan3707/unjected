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
 router.get('/usconversation',async (req, res) => {
  try{
      let user = await db.sequelize.query(`SELECT * from us_conversation`);
   return res.status(200).json({'us_conversation' :  user})
 }catch(err){
   return res.status(400).json({ 'server error':err })
 }
});
router.get('/us_conversation_message',async (req, res) => {
  try{
      let user = await  db.sequelize.query(`SELECT * from us_conversation_message`);
   return res.status(200).json({'us_conversation_message' :  user})
 }catch(err){
   return res.status(400).json({ 'server error':err })
 }
});
router.get('/us_conversation_participant',async (req, res) => {
  try{
      let user = await  db.sequelize.query(`select * from us_conversation_participant`);
   return res.status(200).json({'us_conversation_participant' :  user})
 }catch(err){
   return res.status(400).json({ 'server error':err })
 }
});

router.get('/us_follower',async (req, res) => {
  try{
      let user = await  db.sequelize.query(`select * from us_follower`);
   return res.status(200).json({'us_follower' :  user})
 }catch(err){
   return res.status(400).json({ 'server error':err })
 }
});
router.get('/us_newsletter_subscriber',async (req, res) => {
  try{
      let user = await  db.sequelize.query(`select * from us_newsletter_subscriber`);
   return res.status(200).json({'us_newsletter_subscriber' :  user})
 }catch(err){
   return res.status(400).json({ 'server error':err })
 }
});
router.get('/us_profile_interest',async (req, res) => {
  try{
      let user = await  db.sequelize.query(`select * from us_profile_interest`);
   return res.status(200).json({'us_profile_interest' :  user})
 }catch(err){
   return res.status(400).json({ 'server error':err })
 }
});
router.get('/us_profile_language',async (req, res) => {
  try{
      let user = await  db.sequelize.query(`select * from us_profile_language`);
   return res.status(200).json({'us_profile_language' :  user})
 }catch(err){
   return res.status(400).json({ 'server error':err })
 }
});
router.get('/us_profile_looking_for',async (req, res) => {
  try{
      let user = await  db.sequelize.query(`select * from us_profile_looking_for`);
   return res.status(200).json({'us_profile_looking_for' :  user})
 }catch(err){
   return res.status(400).json({ 'server error':err })
 }
});
router.get('/us_profile_marital_status',async (req, res) => {
  try{
      let user = await  db.sequelize.query(`select * from us_profile_marital_status`);
   return res.status(200).json({'us_profile_marital_status' :  user})
 }catch(err){
   return res.status(400).json({ 'server error':err })
 }
});
router.get('/us_profile_profession',async (req, res) => {
  try{
      let user = await  db.sequelize.query(`select * from us_profile_profession`);
   return res.status(200).json({'us_profile_profession' :  user})
 }catch(err){
   return res.status(400).json({ 'server error':err })
 }
});
router.get('/us_profile_starsign',async (req, res) => {
  try{
      let user = await  db.sequelize.query(`select * from us_profile_starsign`);
   return res.status(200).json({'us_profile_starsign' :  user})
 }catch(err){
   return res.status(400).json({ 'server error':err })
 }
});
router.get('/us_user_interest',async (req, res) => {
  try{
      let user = await  db.sequelize.query(`select * from us_user_interest`);
   return res.status(200).json({'us_user_interest' :  user})
 }catch(err){
   return res.status(400).json({ 'server error':err })
 }
});
router.get('/us_user_language',async (req, res) => {
  try{
      let user = await  db.sequelize.query( `select * from us_user_language`);
   return res.status(200).json({'us_user_language' :  user})
 }catch(err){
   return res.status(400).json({ 'server error':err })
 }
});
router.get('/us_user_location',async (req, res) => {
  try{
      let user = await  db.sequelize.query(`select * from us_user_location`);
   return res.status(200).json({'us_user_location' :  user})
 }catch(err){
   return res.status(400).json({ 'server error':err })
 }
});
router.get('/us_user_permission',async (req, res) => {
  try{
    // user-verified-content
      let user = await  db.sequelize.query(`select * from us_user_permission`);

      // db.us_user.findAll({where:{
      //   username:'BradSheldon'
      // }}).then((data)=>{
      //   db.us_user_permission.create({
      //     user_id:data.username,
      //     name: 'user-verified-content'
      //   })
      // })
   return res.status(200).json({'us_user_permission' :  user})
 }catch(err){
   return res.status(400).json({ 'server error':err })
 }
});
 router.get('/us_user_image',async (req, res) => {
  try{
      let user = await db.sequelize.query(`SELECT * from us_user_image`);
   return res.status(200).json({'us_user_image' :  user})
 }catch(err){
   return res.status(400).json({ 'server error':err })
 }
});
 module.exports = router;
