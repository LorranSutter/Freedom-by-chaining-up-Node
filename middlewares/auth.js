const jwt = require("jsonwebtoken");

// middleware function to check for logged-in users
module.exports = (req, res, next) => {
    if (!(req.session.user && req.cookies.user_sid)) {
    //     // res.redirect('/dashboard');
    // } else {
        res.redirect('/login');
    }
    next();
};

// module.exports = function(req, res, next) {
//     const token = req.header("token");
//     if (!token) 
//         return res.status(401).json({ message: "Auth Error" });

//     try {
//         const decoded = jwt.verify(token, "secret");
//         req.user = decoded.user;
//         next();
//     } catch (e) {
//         console.error(e);
//         res.status(500).send({ message: "Invalid Token" });
//     }
// };