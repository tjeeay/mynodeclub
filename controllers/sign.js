'use strict';

let validator = require('validator');
let eventproxy = require('eventproxy');
let tools = require('../common/tools');
let User = require('../proxy').User;
let config = require('../config');

exports.showLogin = (req, res) => {
  //req.session._loginReferer = req.headers.referer;
  res.render('sign/signin');
};

exports.showSignup = (req, res, next) => {
  res.render('sign/signup');
};

exports.signup = (req, res, next) => {
  let loginname = validator.trim(req.body.loginname).toLowerCase();
  let email = validator.trim(req.body.email).toLowerCase();
  let pass = req.body.pass;
  let rePass = req.body.re_pass;

  let ep = new eventproxy();
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