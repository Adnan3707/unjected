require('dotenv').config()
const express = require('express');
const cors = require("cors")
const session = require('express-session');
const bodyParser = require("body-parser");

const db = require(process.env.data_base1);
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
const app = express();

const domainsFromEnv = process.env.CORS_DOMAINS || "http://localhost:3000"

const whitelist = domainsFromEnv.split(",").map(item => item.trim())

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))
// Passport Config
const passport = require('passport');
require('./middleware/passport')(passport);


// Express body parser
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(function (err, req, res, next) {
    console.log(err)
    res.status(500).send('Something broke!')
  })
// Connect flash
// app.use(flash());

// Global variables
// app.use(function (req, res, next) {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     next();
// });

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/admin',require('./routes/admin'))
app.use('/test',require('./routes/test.js'))
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
