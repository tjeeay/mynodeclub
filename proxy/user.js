'use strict';

let User = require('../models').User;
let uuid = require('uuid');
let utility = require('utility');

/**
 * 根据关键字，获取一组用户
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {String} query 关键字
 * @param {Object} opt 选项
 * @param {Function} callback 回调函数
 */
exports.getUsersByQuery = (query, opt, callback) => {
    User.find(query, '', opt, callback);
};

exports.newAndSave = (name, loginname, pass, email, avatar_url, active, callback) => {
    var user = new User();
    user.name = loginname;
    user.loginname = loginname;
    user.pass = pass;
    user.email = email;
    user.avatar = avatar_url;
    user.active = active;
    user.accessToken = uuid.v4();

    user.save(callback);
};

var makeGravatar = function (email) {
  return 'http://www.gravatar.com/avatar/' + utility.md5(email.toLowerCase()) + '?size=48';
};
exports.makeGravatar = makeGravatar;

exports.getGravatar = function (user) {
  return user.avatar || makeGravatar(user);
};