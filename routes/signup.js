var express = require('express');
// const { check, validationResult} = require("express-validator/check");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var router = express.Router();

const User = require("../models/User");

/* GET signup page. */
router.get('/', function(req, res, next) {
    res.render('signup', { title: 'SignUp' });
});


router.post(
    "/auth",
    // [
    //     check("username", "Please Enter a Valid Username")
    //     .not()
    //     .isEmpty(),
    //     check("email", "Please enter a valid email").isEmail(),
    //     check("password", "Please enter a valid password").isLength({
    //         min: 6
    //     })
    // ],
    async (req, res) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({
        //         errors: errors.array()
        //     });
        // }

    const {
        username,
        email,
        password
    } = req.body;

    try {
        let user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }

        user = new User({
            username,
            email,
            password
        });

        await user.save();

        // const payload = {
        //     user: {
        //         id: user.id
        //     }
        // };

        // jwt.sign(
        //     payload,
        //     "randomString", {
        //         expiresIn: 10000
        //     },
        //     (err, token) => {
        //         if (err) throw err;
        //         res.status(200).json({
        //             token
        //         });
        //     }
        // );
        req.session.user = {
            email: user.email,
            password: user.password
          }
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
  }
);

module.exports = router;
