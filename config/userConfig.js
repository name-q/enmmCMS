// 静态参数配置
const userConfig = {

    // 数据库地址
    systemDataBase: {
        mongodb: 'mongodb://localhost:27018/enmmCMS',
        reids: {
            port: 6379,
            host: 'localhost',
            password: '',
            db: 0
        }
    },
    
    // 系统限制
    systemLimit: {
        // 白名单域名 允许携带cookie
        domainWhiteList: ['http://localhost:3000', '.alipay.com', '.tenpay.com'],
        // 上传类型白名单
        whitelist: ['.png', '.jpeg', '.jpg', '.gif', '.bmp', '.wbmp', '.webp', '.tif'],
        // 上传文件最大限制
        fileSize: '8mb',
        // 表单字段最多限制
        fields: '20',
        // 包含此路径的请求不参与csrf验证
        noCsrfPath: '/api',
        // [控制台打印层级（调试DEBUG 上线NONE）,输出日志层级] 
        // NONE，DEBUG，INFO，WARN, ERROR
        loggerLevel: ['DEBUG', 'WARN'],

    },


}

module.exports = userConfig