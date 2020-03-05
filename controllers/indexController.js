exports.index = (req, res, next) => {
    res.render('index', { title: 'Home' });
}
  
exports.auth = (req, res, next) => {
    res.send(req.session.user && req.cookies.user_sid ? true : false);
}
  