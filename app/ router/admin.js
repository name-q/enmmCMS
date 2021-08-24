/* 管理员路由 */
'use strict';
module.exports = (app) => {
    const {
        router: { get, post, put },
        controller: {
            home
        }
    } = app;
    
    get('/', home.index)
}