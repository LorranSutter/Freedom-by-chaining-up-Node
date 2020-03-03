var express = require('express');
var router = express.Router();

const User = require("../models/User");

/* GET signup page. */
router.get('/', function(req, res, next) {
    res.render('signup', { title: 'SignUp' });
});


router.post(
    "/auth",
    async (req, res) => {

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
