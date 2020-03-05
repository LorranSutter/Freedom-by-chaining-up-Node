let User = require('../models/User');
let bcrypt = require('bcryptjs');

exports.login_index = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    }
    res.render('login', { title: 'Login' });
}

exports.login_auth = async (req, res) => {
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

exports.logout = (req, res) => {
    res.clearCookie('user_sid');
    res.redirect('/');
}

exports.signup_index = (req, res, next) => {
    res.render('signup', { title: 'SignUp' });
}

exports.signup_auth = async (req, res) => {
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