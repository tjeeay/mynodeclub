'use strict';

let moment = require('moment');
let bcrypt = require('bcryptjs');

moment.locale('zh-cn'); // 使用中文

/**
 * 格式化时间
 */
exports.formatDate = (date, friendly) => {
    date = moment(date);
    if (friendly) {
        return date.fromNow();  // 友好显示，比如：2 分钟前
    } else {
        return date.format('YYYY-MM-DD HH:mm');
    }
}

/**
 * 检查用户名的合法性
 */
exports.validateId = (str) => {
    return (/^[a-zA-Z0-9\-_]+$/i).test(str);
}

exports.bhash = (str, callback) => {
    bcrypt.hash(str, 10, callback);
}

exports.bcompare = (str, hash, callback) => {
    bcrypt.compare(str, hash, callback);
}