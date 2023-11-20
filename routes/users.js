const express = require('express');
const router = express.Router();
const Ref = require('../utils/Refs');
const bcrypt = require('bcryptjs');
//Authorization
const passport = require('passport');
const {forwardAuthenticated,ensureAuthenticated} = require('../middleware/auth');

const {upload} = require('../utils/Mul')
const {uploadFile,getFileStream,delImage}= require('../utils/s3')
const {states} = require('../utils/countries')

const {Loc} =require('../utils/Loc-Aws')

const{Sig_Use,Sig_In_Use} = require('../utils/Cog_Aws')

//Database
const db = require(process.env.data_base);
const User = db.user;
const Models = db.models ;
const Op = db.Sequelize.Op;

// Login Page
router.get('/login',ensureAuthenticated, (req, res) => {
   try{
    req.user['unjected'] = req.user.verified ? 'Verified' : 'Not_Verified'
    return res.status(200).json({'user' :  req.user ,'unjected':req.user.unjected })
  }catch(err){
    return res.status(400).json({ 'server error':err })
  }
});

// Register Page
// router.get('/register', (req, res) => res.render('register'));

// Register
router.post('/register', async (req, res) => {
  try{
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
            }else if(role == 'ADMIN'){
              await db.us_user_permission.create({
                 user_id:details.id,
                 name:'ADMIN'
              })
 
              return    res.status(200).send({'done':'Admin User Created Sucessufully'})
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
               await Sig_Use(email,password).then( (data)=>{
              db.us_user.create({
                    'email':email,
                    'first_name':first_name,
                    'last_name':last_name,
                    'username': username ,
                    'cognito_user_id':data.UserSub,
                    'deactivated':false
                }).then((data)=>{
                  return res.status(200).send({'done':' User Created Sucessufully','details':data})
                })
                }).catch(err =>{
                  return res.status(200).send({'error':err})
                })
        // const details =   await db.us_user.create({
        //             'email':email,
        //             'first_name':first_name,
        //             'last_name':last_name,
        //             'username': username ,
        //             'cognito_user_id':cognito_user_id,
        //             'deactivated':false
        //         })
        // if role Exists

            }
        
        }
      }catch(err){
        return res.status(400).json({ 'server error':err })
      }
})



// Login
router.post('/login', passport.authenticate('local',{  failureRedirect: "/wrong-user-or-password"}),async(req, res, next) => {
  let {email,password} = req.body ;
 let cognito_data =  await Sig_In_Use(email,password) 
 if(cognito_data == true ){
    try{
      req.user['unjected'] = req.user.verified ? 'Verified' : 'Not_Verified'
  
      return res.status(200).json({'user' :  req.user ,'unjected':req.user.unjected })
    }catch(err){
      return res.status(400).json({ 'server error':err })
    }
   
 }else{
  return res.status(200).json({'error':cognito_data})
 }

});

// // Login  Google
// router.get('/login/google', passport.authenticate('google'));

// // Login  FaceBook
// router.post('/login/facebook', passport.authenticate('facebook'),(req, res, next) => {
//     return res.status(200).json({'logged in for user' : req.user})
//    });   


// Logout
router.get('/logout', (req, res) => {
  try{
    req.logout();

    res.status(400).json('redirect to /users/login ')
  }catch(err){
    return res.status(400).json({ 'server error':err })
  }
});

router.get('/connections',async (req,res)=>{
  try{
 // name -> first
  let {name,age,gender,looking_for,profession,interests,marital_status,starsign,children} = req.body ;
  const Sea = {
      first_name:name,
      age: age,
      looking_for:looking_for,
      gender: gender,
      profession:profession,
      interests:interests,
      marital_status:marital_status,
      starsign:starsign,
      children:Ref.children[children]
    };
      // Remove properties with null values from the updateValues object
      for (const key in Sea) {
      if (Sea[key] === undefined) {
          delete Sea[key];
      }
      }
      let Use =  await db.us_user.findAll({ where:Sea})
      // console.log(Use)
      return  res.status(400).json({'connections':Use})
    }catch(err){
      return res.status(400).json({ 'server error':err })
    }
})

router.patch('/profile/edit/:id',ensureAuthenticated,async (req,res)=>{
    let {id} = req.params ;
    let {first_name,last_name,birthday,location,gender,address,about_me,interests,languages,looking_for,profession,marital_status,children,starsign,instagram,twitter,website} = req.body ;
    try{
        const updateValues = {
          first_name: first_name,
          last_name: last_name,
          birthday: birthday,
          gender: gender,
          address: address,
          about_me: about_me,
          location:location,
          interests:interests,
          languages:languages,
          looking_for:looking_for,
          profession:profession,
          marital_status:marital_status,
          children:children,
          starsign:starsign,
          instagram:instagram,
          twitter:twitter,
          website:website
        };
            for (const key in updateValues) {
              if (updateValues[key] === undefined) {
                delete updateValues[key];
              }
            }
        const [rowCount, updatedUsers] = await db.us_user.update(updateValues, {
          where: { 
            cognito_user_id: id 
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
router.post('/profile/upload/:Cog_id', upload().single(), async function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    const file = req.file
    console.log(file)
    const result = await uploadFile(file,req)
    const description = req.body.description
    res.send({imsgepath:`${result.key}`})
  })
  router.get('/profile/images',async(req,res)=>{
    // const key = req.params.key ;
    const formData = new FormData();
    const key = req.body.key
    const cogn = req.body.id
    const readStream = getFileStream(key,req.body.Ite)
    console.log(key)
    // await formData.append('avatar', readStream);
    // axios.post(`http://localhost:5000/users/profile/upload/${cogn}`, formData).then(function (response) {
    //     console.log('Response:', response.data);
    //   })
    readStream.pipe(res)
  })

  router.patch('/profile/delete/:key',async(req,res)=>{
    const key = req.params.key ;
    
    const result =  await delImage(key)
    console.log(result)
    // res.send({result})
  })
  router.get('/address',async (req,res)=>{
    let {search} = req.body
    console.log(search)
    let match = states.filter((state)=>{
        const regex =  new RegExp(`^${search}`,'gi')
        return state.name.match(regex)  || state.code2.match(regex) 
    })
    res.send({match})
  })
  router.get('/location',async(req,res)=>{
    try{
    const data = await Loc(req.body)
    // console.log(data)
    const Dat_For = data.map((obj)=>obj.Place.Label)
    res.send(Dat_For)
  }catch(err){
    return res.status(400).json({ 'server error':err })
  }
  })

module.exports = router;
