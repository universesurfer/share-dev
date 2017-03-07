var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwtOptions');

//--------------------------------------------- OUR USER MODEL
const User = require("../models/user");
const mongoose = require('mongoose');

// --------------------------------------------- BCRYPT
const bcrypt = require("bcrypt");
const bcryptSalt     = 10;


router.post("/login", function(req, res) {

  // if(req.body.username && req.body.password){
  //   // var email = req.body.email;
  //   // var firstName = req.body.firstName;
  //   // var lastName = req.body.lastName;
  //   // var password = req.body.password;
  // }

var email = req.body.email;
var password = req.body.password;

  if (email === "" || password === "") {
    res.status(401).json({message:"Fill up all fields."});
    return;
  }

  User.findOne({ "email": email }, (err, user)=> {

  	if( ! user ){
	    res.status(401).json({message:"no such email found"});
	  } else {
      bcrypt.compare(password, user.password, function(err, isMatch) {
        console.log(isMatch);
        if (!isMatch) {
          res.status(401).json({message:"password did not match"});
        } else {
          var payload = {id: user._id};
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({message: "ok", token: token});
        }
      });
    }
  });
});

router.post("/signup", (req, res, next) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = req.body.password;

  if (!email || !password || !firstName || !lastName) {
    res.status(400).json({ message: "First name, last name, email, and password required." });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: 'email exists already' });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      email,
      firstName,
      lastName,
      password: hashPass
    });

    newUser.save((err, user) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        var payload = {id: user._id};
        console.log('user', user);
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(200).json({message: "ok", token: token});
      	// res.status(200).json(user);
      }
    });
  });
});



module.exports = router;
