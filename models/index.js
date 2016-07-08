'use strict';

let config = require('../config');
let logger = require('../common/logger');
let mongoose = require('mongoose');

mongoose.connect(config.db,
    {
        server: { poolSize: 20 }    // 设置连接池大小
    }, (err) => {
        if (err) {
            logger.error('connect to %s error: %s', config.db, err.message);
            process.exit(1);    // 异常退出
        }
    });

// models
require('./user');
require('./topic');
require('./reply');
require('./topic_collect');
require('./message');

exports.User = mongoose.model('User');
exports.Topic = mongoose.model('Topic');
exports.Reply = mongoose.model('Reply');
exports.TopicCollect = mongoose.model('TopicCollect');
exports.Message = mongoose.model('Message');