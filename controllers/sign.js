

exports.showLogin = function (req, res) {
  //req.session._loginReferer = req.headers.referer;
  res.render('sign/signin');
};


exports.showSignup = function (req, res) {
    res.render('sign/signup');
}