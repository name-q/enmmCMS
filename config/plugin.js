'use strict';

module.exports = {
  //mongoDB
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },

  //redis
  redis: {
    enable: true,
    package: 'egg-redis',
  },

  //允许cookie跨域
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};
