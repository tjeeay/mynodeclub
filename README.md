## 参考 [CNode](https://github.com/cnodejs/nodeclub) 源码，对 Node.js 进行学习

在技术采用上并非完全参照 CNode 的源码，自己有做相应调整：

* IDE 使用 `vscode`
* 使用 `typings` 增强智能提示

* 使用 `ES6` 语法
* Web 框架使用 `Express`

* 构建工具
  * Bower
  * Gulp
  * Webpack


# 数据库
* User
* Topic
* TopicCollect
* Reply
* Message


## 功能模块
* 注册
* 登录
  * OAuth：使用 Github 账号登录

* 首页
  * 话题列表
  * 发步话题
  * 话题详情
    * 评论列表
    * 发表评论/回复
  * 无人回复的话题
  * 积分榜