var express = require('express');
var router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');



router.get('/', (req, res, next) => {
  User.find({})
    .exec((err, users) => {
      if (err) {
        return res.send(err);
      }
      console.log(res.json);
      return res.json(users);
    });
});



router.get('/:id', (req, res) => {
 console.log("getting a specific user");
 if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
   return res.status(400).json({ message: 'Specified id is not valid' });
 }

 User.findById(req.params.id, (err, users) => {
   if (err) {
      return res.send(err);
    }

    return res.json(users);
  });


});







module.exports = router;
