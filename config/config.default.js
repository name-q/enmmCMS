/* eslint valid-jsdoc: "off" */

'use strict';

const fs = require('fs');
const path = require('path');

module.exports = appInfo => {

  // 用户参数
  const userConfig = {
  };

  // 白名单地址 允许携带cookie
  const domainWhiteList = ['http://localhost:3000', '.alipay.com', '.tenpay.com']

  const config = exports = {

    /* 存储配置 */
    mongoose: {
      client: {
        url: 'mongodb://localhost:27018/enmmCMS',
        options: {
          useCreateIndex: true,
          useFindAndModify: false,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      },
    },
    redis: {
      client: {
        port: 6379,
        host: 'localhost',
        password: '',
        db: 0
      },
    },

    /* 网络传输 */
    multipart: {
      mode: 'stream',// 流式上传
      whitelist: ['.png', '.jpeg', '.jpg', '.gif', '.bmp', '.wbmp', '.webp', '.tif'],// 类型白名单
      fileSize: '8mb',// 上传文件最大限制
      fields: '20'// 表单字段最多限制
    },
    session: {
      key: 'SESS_ID',
      maxAge: 300000,// 过期时间5分钟
      httpOnly: true,// 不允许JS访问
      encrypt: true,// 加密
      renew: true// 延长会话有效期
    },
    // nginx代理下获取用户真实ip
    proxy: true,
    maxProxyCount: 1,

    /* 安全配置 */
    security: {
      // /api开头的请求不参与csrf验证
      csrf: {
        ignore: ctx => ctx.request.url.indexOf('/api') != -1 ? true : false
      },
      domainWhiteList
    },

    // 跨域
    cors: {
      origin: ctx => domainWhiteList.includes(ctx.header.origin) ? ctx.header.origin : domainWhiteList[0],
      allowMethods: 'GET,PUT,POST,DELETE,HEAD',
      credentials: true // cookie跨域
    },

    /* 日志配置 */
    logger: {
      // NONE，DEBUG，INFO，WARN, ERROR
      // LOG控制台不打印 开发&调试时--DEBUG 线上--NONE
      consoleLevel: 'DEBUG',
      // 输出warning及以上日志
      level: 'WARN',
      // 日志地址
      dir: path.join(appInfo.baseDir, 'logs/app'),
      // 日志文件名
      appLogName: `${appInfo.name}-web.log`,
      coreLogName: 'core.log',
      agentLogName: 'agent.log',
      errorLogName: 'error.log',
    },

    // 定时任务
    customLogger: {
      scheduleLogger: {
        // 日志地址
        file: path.join(appInfo.baseDir, 'logs/app/schedule.log'),
      },
    },
  };

  // cookie key
  config.keys = appInfo.name + '_1620206666@qq.com';

  // middleware
  config.middleware = [];

  return {
    ...config,
    ...userConfig,
  };

};
