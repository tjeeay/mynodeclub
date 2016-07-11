'use strict';

let validator = require('validator');
let Eventproxy = require('eventproxy');
let tools = require('../common/tools');
let User = require('../proxy').User;
let config = require('../config');
let auth = require('../middlewares/auth');

exports.showLogin = (req, res) => {
  //req.session._loginReferer = req.headers.referer;
  res.render('sign/signin');
};

exports.login = (req, res, next) => {
  let name = validator.trim(req.body.name).toLowerCase();
  let pass = req.body.pass;

  if (!name || !pass) {
    return res.render('sign/signin', { error: '请输入用户名和密码。' });
  }

  let ep = new Eventproxy();
  ep.fail(next);
  ep.on('login_error', msg => {
    res.status(422);
    return res.render('sign/signin', {
      error: msg
    });
  });

  let getUser;
  if (name.indexOf('@') > 0) {
    getUser = User.getUserByEmail;
  } else {
    getUser = User.getUserByLoginName;
  }

  getUser(name, (err, user) => {
    if (err) {
      return ep.emit('login_error', '数据库异常，登录失败。');
    }
    if (!user) {
      return ep.emit('login_error', '用户不存在');
    }

    var passhash = user.pass;
    tools.bcompare(pass, passhash, ep.done(bool => {
      if (!bool) {
        return ep.emit('login_error', '用户名或密码错误。');
      }

      if (!user.active) {
        // 重新发送激活邮件
        // TODO
        res.status(403);
        return rs.render('sign/signin', { error: '此帐号还没有被激活，激活链接已发送到 ' + user.email + ' 邮箱，请查收。' });
      }

      // store session cookie
      auth.gen_session(user, res);

      // check at some page just jump to home page
      var refer = req.session._loginReferer || '/';
      // skip not jump page
      // TODO

      return res.redirect(refer);
    }));

  });
};

exports.showSignup = (req, res, next) => {
  res.render('sign/signup');
};

exports.signup = (req, res, next) => {
  let loginname = validator.trim(req.body.loginname).toLowerCase();
  let email = validator.trim(req.body.email).toLowerCase();
  let pass = req.body.pass;
  let rePass = req.body.re_pass;

  let ep = new Eventproxy();
  ep.fail(next);
  let prop_err = 'prop_err';
  ep.on(prop_err, msg => {
    res.status(422);
    res.render('sign/signup', {
      error: msg,
      loginname: loginname,
      email: email
    });
  });

  // 验证信息的正确性
  if ([loginname, email, pass, rePass].some(item => { return item === ''; })) {
    ep.emit(prop_err, '信息不完整。');
    return;
  }
  if (loginname.length < 5) {
    ep.emit(prop_err, '用户名至少需要5个字符。');
    return;
  }
  if (!tools.validateId(loginname)) {
    ep.emit(prop_err, '用户名不合法。');
  }
  if (!validator.isEmail(email)) {
    ep.emit(prop_err, '邮箱不合法。');
  }
  if (pass !== rePass) {
    return ep.emit(prop_err, '两次密码输入不一致。');
  }

  // 保存到数据库
  User.getUsersByQuery({
    '$or': [
      { 'loginname': loginname },
      { 'email': email }
    ]
  }, {}, (err, users) => {
    if (err) {
      return next(err);
    }
    if (users.length > 0) {
      ep.emit(prop_err, '用户名或邮箱已被使用。')
      return;
    }

    tools.bhash(pass, ep.done(passhash => {
      // create gravatar
      var avatarUrl = User.makeGravatar(email);
      User.newAndSave(loginname, loginname, passhash, email, avatarUrl, true, (err, user) => {
        if (err) {
          return next(err);
        }

        // TODO
        // 发送激活邮件

        res.render('sign/signup', {
          success: '欢迎加入 ' + config.name + '！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。'
        });
      });
    }));

  });
};

// sign out
exports.signout = (req, res, next) => {
  req.session.destroy();
  res.clearCookie(config.auth_cookie_name, { path: '/' });
  res.redirect('/');
}