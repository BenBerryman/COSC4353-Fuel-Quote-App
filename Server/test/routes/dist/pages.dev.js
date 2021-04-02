"use strict";

var express = require('express');

var User = require('../core/user');

var router = express.Router();

var FuelController = require('../controllers/FuelController'); //use the User class to perform db operations.


var user = new User(); //get the routes for purchase.
//get index page.

router.get('/', function (req, res, next) {
  var user = req.session.user;

  if (user) {
    res.redirect('/home');
    return;
  }

  res.render('index', {
    title: "Fuel App"
  });
}); //get home page.

router.get('/home', function (req, res, next) {
  var user = req.session.user;

  if (user) {
    res.render('home', {
      opp: req.session.opp,
      name: user.fullname
    });
    return;
  }

  res.redirect('/');
}); //Post login data

router.post('/login', function (req, res, next) {
  user.login(req.body.username, req.body.password, function (result) {
    if (result) {
      req.session.user = result;
      req.session.opp = 1;
      res.redirect('/home');
    } else {
      res.send('Username/Password Incorrect!');
    }
  }); // res.send(req.body.Username);
}); //Post register data

router.post('/register', function (req, res, next) {
  //register the person here.
  var userInput = {
    username: req.body.username,
    fullname: req.body.fullname,
    password: req.body.password
  };
  user.create(userInput, function (lastId) {
    if (lastId) {
      user.find(lastId, function (result) {
        req.session.user = result;
        req.session.opp = 0;
        res.redirect('/home');
      });
    } else {
      console.log('Error creating a new user...');
    }
  });
}); //take the user to profile create page.
// router.get('/profile', (req, res, next) => {
//     let profileData = {
//         fullname:req.body.fullname,
//         street: req.body.street,
//         city: req.body.city,
//         state: req.body.state,
//         zip: req.body.zip
//     }
//     res.render('/profile');
//     return;
// user.profile(profileData, function (lastId) {
//     if (lastId) {
//         user.find(lastId, function (result) {
//             req.session.user = result;
//             req.session.opp = 0;
//             res.redirect('/home');
//         });
//     } else {
//         console.log('Error creating your Profile...');
//     }
// });
// });
//save the gallons bought.

router.get('/order', function (req, res, next) {
  var fueldata = {
    gallons: req.body.gallons,
    delivery: req.body.date,
    date: req.body.date,
    amount: req.body.amount
  };
  user.fuel(fueldata, function (err) {
    if (err) throw err;
    return;
  });
}); //Get logout page.

router.get('/logout', function (req, res, next) {
  if (req.session.user) {
    req.session.destroy(function () {
      res.redirect('/');
    });
  }
});
router.get('/purchase', FuelController.getAllPurchases);
router.get('/:id', FuelController.getSinglePurchase);
module.exports = router;