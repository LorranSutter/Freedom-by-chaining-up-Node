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
  // [
  //   check("email", "Please enter a valid email").isEmail(),
  //   check("password", "Please enter a valid password").isLength({
  //     min: 6
  //   })
  // ],
  async (req, res) => {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return res.status(400).json({
    //     errors: errors.array()
    //   });
    // }

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

      // const payload = {
      //   user: {
      //     id: user.id
      //   }
      // };

      // jwt.sign(
      //   payload,
      //   "secret",
      //   {
      //     expiresIn: 3600
      //   },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.status(200).json({
      //       token
      //     });
      //   }
      // );
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

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router;
