const express = require('express');
const router = express.Router();
const {ensureAuthenticated, forwardAuthenticated} = require('../middleware/auth');

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

module.exports = router;
