const dotenv = require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const session = require('express-session')
const Routes = require("./routes/index.js");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
const flash = require('connect-flash')
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
  });

// express session 
app.use(session({
    secret: 'kikai-secerate',
    resave: true,
    saveUninitialized: true
}));
// connect flash session
app.use(flash());

// global vars session
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})
// DB Cofiguration
const db = require('./config/keys').MongoURI
mongoose.connect(db, { useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true})
        .then(() => console.log('Mongo DB Connected'))
        .catch(err => console.log(err) );

  
// login
app.use("/api/v1/admin", Routes.adminAuthRoutes);
app.use("/api/v1/subject", Routes.subjectRoutes);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('backend/build'));
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'backend','build','index.html'));
  });
}
app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
})