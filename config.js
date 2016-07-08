'use strict';

let config = {
    // debug 为 true 时，用于本地调试
    debug: true,

    // 是否启用静态文件的合并压缩，详见视图中的Loader
    get mini_assets() { return !this.debug; },

    name: 'Nodeclub', // 社区名字
    description: 'CNode：Node.js专业中文社区', // 社区的描述
    keywords: 'nodejs, node, express, connect, koa, socket.io',

    // 添加到 html head 中的信息
    site_headers: [
        '<meta name="author" content="tjeeay@outlook.com" />'
    ],
    site_logo: '/public/images/cnodejs_light.svg', // default is `name`
    site_icon: '/public/images/cnode_icon_32.png', // 默认没有 favicon, 这里填写网址

    // 右上角的导航区
    site_navs: [
        // 格式 [ path, title, [target=''] ]
        [ '/about', '关于' ]
    ],

    // cdn host，如 http://cnodejs.qiniudn.com
    site_static_host: '', // 静态文件存储域名（可用于实现动静分离）

    // 社区的域名
    host: 'localhost',
    // 程序运行的端口
    port: 3001,

    // MongoDB配置
    db: 'mongodb://127.0.0.1/my_node_club',

};

module.exports = config;