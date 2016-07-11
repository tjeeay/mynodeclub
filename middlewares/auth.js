'use strict';

let config = require('../config');
let Eventproxy = require('eventproxy');
let mongoose = require('mongoose');
let UserModel = mongoose.model('User');
var UserProxy  = require('../proxy').User;

exports.gen_session = (user, res) => {
    let auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
    let opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true
    };
    res.cookie(config.auth_cookie_name, auth_token, opts);
};

exports.authUser = (req, res, next) => {
    let ep = new Eventproxy();
    ep.fail(next);

    // Ensure current_user always has defined.
    res.locals.current_user = null;

    ep.all('get_user', user => {
        if (!user) {
            return next();
        }
        user = res.locals.current_user = req.session.user = new UserModel(user);

        // 获取用户未读消息数
        // TODO

        next();
    });

    if (req.session.user) {
        ep.emit('get_user', req.session.user);
    } else {
        let auth_token = req.signedCookies[config.auth_cookie_name];
        if (!auth_token) {
            return next();
        }

        let auth = auth_token.split('$$$$');
        let user_id = auth[0];
        UserProxy.getUserById(user_id, ep.done('get_user'));
    }
};