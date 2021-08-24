/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

const userConfig = require("./userConfig");
const {
  systemLimit: {
    domainWhiteList,
    whitelist,
    fileSize,
    fields,
    noCsrfPath,
    loggerLevel,
  },
  systemDataBase: {
    mongodb,
    reids
  }
} = userConfig

module.exports = appInfo => {

  const config = exports = {

    /* 存储配置 */
    mongoose: {
      client: {
        url: mongodb,
        options: {
          useCreateIndex: true,
          useFindAndModify: false,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      },
    },
    redis: {
      client: reids
    },

    /* 网络传输 */
    multipart: {
      mode: 'stream',// 流式上传
      whitelist,
      fileSize,
      fields
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
      csrf: {
        ignore: ctx => ctx.request.url.indexOf(noCsrfPath) != -1 ? true : false
      },
      domainWhiteList
    },

    // 跨域
    cors: {
      origin: ctx => domainWhiteList.includes(ctx.header.origin) ? ctx.header.origin : domainWhiteList[0],
      allowMethods: 'GET,PUT,POST,DELETE,HEAD',
      // cookie跨域
      credentials: true
    },

    /* 日志配置 */
    logger: {
      // NONE，DEBUG，INFO，WARN, ERROR
      // LOG控制台打印层级 开发&调试时--DEBUG 线上--NONE
      consoleLevel: loggerLevel[0],
      // 输出warning及以上日志
      level: loggerLevel[1],
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

  return {
    ...config,
    ...userConfig,
  };

};
