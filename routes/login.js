var express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var router = express.Router();

const User = require("../models/User");
const auth = require("../middlewares/auth");

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post(
  "/auth",
  async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });
      
      req.session.user = {
        email: user.email,
        password: user.password
      }
      res.redirect('/dashboard');
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

// route for user logout
router.get('/logout', auth, (req, res) => {
  res.clearCookie('user_sid');
  res.redirect('/');
});

module.exports = router;
